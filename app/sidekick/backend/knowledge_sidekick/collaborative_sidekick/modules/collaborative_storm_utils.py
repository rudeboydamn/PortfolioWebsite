import dspy
import os
import re
import sys
import toml
from typing import List, Tuple, Dict, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from ..engine import RunnerArgument
from ...interface import Information, Retriever, LMConfigs
from ...logging_wrapper import LoggingWrapper
from ...rm import BingSearch


def extract_storm_info_snippet(info: Information, snippet_index: int) -> Information:
    """
    Constructs a new Information instance with only the specified snippet index.

    Args:
        storm_info (Information): The original Information instance.
        snippet_index (int): The index of the snippet to retain.

    Returns:
        Information: A new Information instance with only the specified snippet.
    """
    if snippet_index < 0 or snippet_index >= len(info.snippets):
        raise ValueError("Snippet index out of range")

    new_snippets = [info.snippets[snippet_index]]
    new_storm_info = Information(
        info.url, info.description, new_snippets, info.title, info.meta
    )
    return new_storm_info


def format_search_results(
    searched_results: List[Information],
    info_max_num_words: int = 1000,
    mode: str = "brief",
    include_source_details: bool = False,
) -> Tuple[str, Dict[int, Information]]:
    """
    Constructs a string from a list of search results with a specified word limit and returns a mapping of indices to Information.

    Args:
        searched_results (List[Information]): List of Information objects to process.
        info_max_num_words (int, optional): Maximum number of words allowed in the output string. Defaults to 1000.
        mode (str, optional): Mode of summarization. 'brief' takes only the first snippet of each Information.
                                'extensive' adds snippets iteratively until the word limit is reached. Defaults to 'brief'.
        include_source_details (bool, optional): Whether to include source title and URL in the output. Defaults to False.

    Returns:
        Tuple[str, Dict[int, Information]]:
            - Formatted string with search results, constrained by the word limit.
            - Dictionary mapping indices to the corresponding Information objects.
    """
    total_length = 0

    extracted_snippet_queue = []
    max_snippets = (
        max(len(info.snippets) for info in searched_results) if searched_results else 0
    )
    max_snippets = 1 if mode == "brief" else max_snippets
    abort = False
    included_snippets = set()
    for i in range(max_snippets):
        for info in searched_results:
            if i < len(info.snippets) and not abort:
                cur_snippet = info.snippets[i]
                cur_snippet_len = len(info.snippets[i].split())
                if total_length + cur_snippet_len > info_max_num_words:
                    abort = True
                    break
                if cur_snippet not in included_snippets:
                    included_snippets.add(cur_snippet)
                    info = extract_storm_info_snippet(info, snippet_index=i)
                    extracted_snippet_queue.append(info)
                    total_length += cur_snippet_len
    output = []
    index_mapping = {}
    for idx, info in enumerate(extracted_snippet_queue):
        if include_source_details:
            source_header = f"[{idx + 1}] \"{info.title}\" ({info.url})"
            output.append(f"{source_header}\n{info.snippets[0]}")
        else:
            output.append(f"[{idx + 1}]: {info.snippets[0]}")
        index_mapping[idx + 1] = info
    assert -1 not in index_mapping
    return "\n".join(output), index_mapping


def format_citation_with_details(
    citation_index: int,
    info: Information,
    style: str = "inline"
) -> str:
    """
    Format a citation with source details.

    Args:
        citation_index (int): The citation index number.
        info (Information): The Information object containing source details.
        style (str): Citation style - 'inline', 'footnote', or 'full'.

    Returns:
        str: Formatted citation string.
    """
    if style == "inline":
        return f"[{citation_index}]"
    elif style == "footnote":
        return f"[{citation_index}: {info.title}]"
    elif style == "full":
        return f"[{citation_index}] {info.title} - {info.url}"
    else:
        return f"[{citation_index}]"


def generate_citation_block(
    cited_info: Dict[int, Information],
    style: str = "numbered"
) -> str:
    """
    Generate a formatted citation/references block.

    Args:
        cited_info (Dict[int, Information]): Dictionary mapping citation indices to Information objects.
        style (str): Style of the citation block - 'numbered', 'bulleted', or 'academic'.

    Returns:
        str: Formatted citation block string.
    """
    if not cited_info:
        return ""
    
    citations = []
    sorted_indices = sorted(cited_info.keys())
    
    for idx in sorted_indices:
        info = cited_info[idx]
        title = info.title if info.title else "Untitled"
        url = info.url if info.url else ""
        description = info.description[:100] + "..." if info.description and len(info.description) > 100 else (info.description or "")
        
        if style == "numbered":
            citations.append(f"[{idx}] {title}\n    URL: {url}")
        elif style == "bulleted":
            citations.append(f"• [{idx}] {title} ({url})")
        elif style == "academic":
            citations.append(f"[{idx}] {title}. Retrieved from {url}")
        else:
            citations.append(f"[{idx}] {title} - {url}")
    
    header = "\n---\n**Sources:**\n" if style != "academic" else "\n---\n**References:**\n"
    return header + "\n".join(citations)


def extract_cited_storm_info(
    response: str, index_to_storm_info: Dict[int, Information]
) -> Dict[int, Information]:
    """
    Extracts a sub-dictionary of Information instances that are cited in the response.

    Args:
        response (str): The response string containing inline citations like [1], [2], etc.
        index_to_storm_info (Dict[int, Information]): A dictionary mapping indices to Information instances.

    Returns:
        Dict[int, Information]: A sub-dictionary with only the indices that appear in the response.
    """
    cited_indices = set(map(int, re.findall(r"\[(\d+)\]", response)))
    cited_storm_info = {
        index: info
        for index, info in index_to_storm_info.items()
        if index in cited_indices
    }
    return cited_storm_info


def trim_output_after_hint(response: str, hint: str) -> str:
    """
    Trims the output string to only keep the substring after the given hint (not including the hint).

    Args:
        response (str): The original output string.
        hint (str): The hint string after which the substring should be kept.

    Returns:
        str: The trimmed output string, or the original string if the hint is not found.
    """
    if hint in response:
        start_index = response.find(hint) + len(hint)
        return response[start_index:].strip()
    return response.strip("\n")


def separate_citations(text: str) -> str:
    """
    Separates multiple citations within square brackets into individual citations.

    Args:
        text (str): The input string containing citations.

    Returns:
        str: The string with separated citations.
    """

    # Define a function to process each match
    def replace_citations(match):
        citations = match.group(1).split(",")
        return "".join(f"[{citation.strip()}]" for citation in citations)

    # Use regular expressions to find and replace citations
    pattern = re.compile(r"\[(\d+(?:,\s*\d+)*)\]")
    return pattern.sub(replace_citations, text)


def extract_and_remove_citations(text: str) -> Tuple[str, List[int]]:
    """
    Removes single inline citations from the input string and returns the modified string and a list of citation integers.

    Args:
        text (str): The input string containing citations.

    Returns:
        Tuple[str, List[int]]: The string after removal of citations and a list of citation integers.
    """
    citations = []

    # Define a function to process each match
    def extract_citation(match):
        citation = int(match.group(1))
        citations.append(citation)
        return ""

    # Use regular expressions to find and replace citations
    pattern = re.compile(r"\[(\d+)\]")
    modified_text = pattern.sub(extract_citation, text)

    return modified_text, citations


def keep_first_and_last_paragraph(text: str) -> str:
    """
    Processes the input text to keep the first and last paragraphs and replace
    the middle paragraphs with '[content omitted due to space limit]'.

    Args:
        text (str): The input text containing paragraphs separated by '\n\n'.

    Returns:
        str: The processed text.
    """
    paragraphs = text.split("\n\n")

    if len(paragraphs) <= 3:
        return text

    first_paragraph = paragraphs[0]
    last_paragraph = "\n\n".join(paragraphs[-2:])
    return (
        f"{first_paragraph}\n\n[content omitted due to space limit]\n\n{last_paragraph}"
    )


def clean_up_section(text):
    """Clean up a section:
    1. Remove uncompleted sentences (usually due to output token limitation).
    2. Deduplicate individual groups of citations.
    3. Remove unnecessary summary."""

    paragraphs = text.split("\n")
    output_paragraphs = []
    summary_sec_flag = False
    for p in paragraphs:
        p = p.strip()
        if len(p) == 0:
            continue
        if not p.startswith("#"):
            p = separate_citations(p)
        if summary_sec_flag:
            if p.startswith("#"):
                summary_sec_flag = False
            else:
                continue
        if (
            p.startswith("Overall")
            or p.startswith("In summary")
            or p.startswith("In conclusion")
        ):
            continue
        if "# Summary" in p or "# Conclusion" in p:
            summary_sec_flag = True
            continue
        output_paragraphs.append(p)

    return "\n\n".join(output_paragraphs)  # Join with '\n\n' for markdown format.


def load_api_key(toml_file_path):
    try:
        with open(toml_file_path, "r") as file:
            data = toml.load(file)
    except FileNotFoundError:
        print(f"File not found: {toml_file_path}", file=sys.stderr)
        return
    except toml.TomlDecodeError:
        print(f"Error decoding TOML file: {toml_file_path}", file=sys.stderr)
        return
    # Set environment variables
    for key, value in data.items():
        os.environ[key] = str(value)


def _get_answer_question_module_instance(
    lm_config: LMConfigs,
    runner_argument: "RunnerArgument",
    logging_wrapper: LoggingWrapper,
    rm: Optional[dspy.Retrieve] = None,
):
    from .grounded_question_answering import AnswerQuestionModule

    # configure retriever
    if rm is None:
        rm = BingSearch(k=runner_argument.retrieve_top_k)
    retriever = Retriever(rm=rm, max_thread=runner_argument.max_search_thread)
    # return AnswerQuestionModule instance
    return AnswerQuestionModule(
        retriever=retriever,
        max_search_queries=runner_argument.max_search_queries,
        question_answering_lm=lm_config.question_answering_lm,
        logging_wrapper=logging_wrapper,
    )
