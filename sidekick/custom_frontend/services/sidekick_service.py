import os
import uuid
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Optional, List
import sys

# Add parent directory to import knowledge_storm
parent_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(parent_dir))

from knowledge_storm import STORMWikiRunnerArguments, STORMWikiRunner, STORMWikiLMConfigs
from knowledge_storm.lm import OpenAIModel
from knowledge_storm.rm import YouRM, BingSearch


class SidekickService:
    def __init__(self):
        self.articles_dir = Path("articles")
        self.articles_dir.mkdir(exist_ok=True)
        
        self.jobs: Dict[str, Dict] = {}
        
        # Initialize LM configs
        self.lm_configs = STORMWikiLMConfigs()
        
        # Setup language models from environment
        openai_api_key = os.getenv("OPENAI_API_KEY")
        if openai_api_key:
            self.lm_configs.set_conv_simulator_lm(OpenAIModel(
                model=os.getenv("DEFAULT_LLM_MODEL", "gpt-4"),
                api_key=openai_api_key,
                temperature=float(os.getenv("DEFAULT_TEMPERATURE", "0.7"))
            ))
            
            self.lm_configs.set_question_asker_lm(OpenAIModel(
                model=os.getenv("DEFAULT_LLM_MODEL", "gpt-4"),
                api_key=openai_api_key,
                temperature=float(os.getenv("DEFAULT_TEMPERATURE", "0.7"))
            ))
            
            self.lm_configs.set_outline_gen_lm(OpenAIModel(
                model=os.getenv("DEFAULT_LLM_MODEL", "gpt-4"),
                api_key=openai_api_key,
                temperature=float(os.getenv("DEFAULT_TEMPERATURE", "0.7"))
            ))
            
            self.lm_configs.set_article_gen_lm(OpenAIModel(
                model=os.getenv("DEFAULT_LLM_MODEL", "gpt-4"),
                api_key=openai_api_key,
                temperature=float(os.getenv("DEFAULT_TEMPERATURE", "0.7"))
            ))
            
            self.lm_configs.set_article_polish_lm(OpenAIModel(
                model=os.getenv("DEFAULT_LLM_MODEL", "gpt-4"),
                api_key=openai_api_key,
                temperature=float(os.getenv("DEFAULT_TEMPERATURE", "0.7"))
            ))
        
        # Setup retrieval module based on config
        self.rm = self._setup_retrieval_module()
    
    def _setup_retrieval_module(self):
        """Setup retrieval module based on environment configuration"""
        search_engine = os.getenv("DEFAULT_SEARCH_ENGINE", "you").lower()
        
        if search_engine == "you":
            api_key = os.getenv("YOU_API_KEY")
            if not api_key:
                raise ValueError("YOU_API_KEY not found in environment")
            return YouRM(ydc_api_key=api_key, k=5)
        
        elif search_engine == "bing":
            api_key = os.getenv("BING_API_KEY")
            if not api_key:
                raise ValueError("BING_API_KEY not found in environment")
            return BingSearch(bing_search_api_key=api_key, k=5)
        
        else:
            raise ValueError(f"Unsupported search engine: {search_engine}")
    
    def create_article_job(self, topic: str) -> str:
        """Create a new article generation job"""
        article_id = str(uuid.uuid4())
        
        self.jobs[article_id] = {
            "article_id": article_id,
            "topic": topic,
            "status": "initialized",
            "progress": 0,
            "current_stage": "waiting",
            "created_at": datetime.now().isoformat(),
            "outline": None,
            "article_content": None
        }
        
        return article_id
    
    def generate_article(
        self,
        article_id: str,
        topic: str,
        max_conv_turn: int = 3,
        max_perspective: int = 3,
        search_top_k: int = 5,
        max_search_queries: int = 3
    ):
        """Generate article using Sidekick"""
        try:
            # Update status
            self.jobs[article_id]["status"] = "running"
            self.jobs[article_id]["current_stage"] = "pre-writing"
            self.jobs[article_id]["progress"] = 10
            
            # Setup output directory
            output_dir = self.articles_dir / article_id
            output_dir.mkdir(exist_ok=True)
            
            # Configure Sidekick runner arguments
            engine_args = STORMWikiRunnerArguments(
                output_dir=str(output_dir),
                max_conv_turn=max_conv_turn,
                max_perspective=max_perspective,
                search_top_k=search_top_k,
                max_search_queries=max_search_queries,
            )
            
            # Create Sidekick runner
            runner = STORMWikiRunner(engine_args, self.lm_configs, self.rm)
            
            # Run pre-writing stage
            self.jobs[article_id]["progress"] = 20
            runner.run(
                topic=topic,
                do_research=True,
                do_generate_outline=True,
                do_generate_article=False,
                do_polish_article=False,
            )
            
            self.jobs[article_id]["current_stage"] = "outline-generated"
            self.jobs[article_id]["progress"] = 50
            
            # Save outline
            outline_path = output_dir / "storm_gen_outline.txt"
            if outline_path.exists():
                with open(outline_path, 'r') as f:
                    self.jobs[article_id]["outline"] = f.read()
            
            # Run article generation stage
            self.jobs[article_id]["current_stage"] = "writing"
            self.jobs[article_id]["progress"] = 60
            
            runner.run(
                topic=topic,
                do_research=False,
                do_generate_outline=False,
                do_generate_article=True,
                do_polish_article=True,
            )
            
            self.jobs[article_id]["current_stage"] = "completed"
            self.jobs[article_id]["progress"] = 100
            
            # Load generated article
            article_path = output_dir / "storm_gen_article_polished.txt"
            if article_path.exists():
                with open(article_path, 'r') as f:
                    self.jobs[article_id]["article_content"] = f.read()
            
            # Save metadata
            metadata = {
                "article_id": article_id,
                "topic": topic,
                "created_at": self.jobs[article_id]["created_at"],
                "completed_at": datetime.now().isoformat(),
                "parameters": {
                    "max_conv_turn": max_conv_turn,
                    "max_perspective": max_perspective,
                    "search_top_k": search_top_k,
                    "max_search_queries": max_search_queries
                }
            }
            
            with open(output_dir / "metadata.json", 'w') as f:
                json.dump(metadata, f, indent=2)
            
            self.jobs[article_id]["status"] = "completed"
            
        except Exception as e:
            self.jobs[article_id]["status"] = "failed"
            self.jobs[article_id]["error"] = str(e)
            raise
    
    def get_article_status(self, article_id: str) -> Optional[Dict]:
        """Get the current status of an article generation job"""
        return self.jobs.get(article_id)
    
    def list_articles(self) -> List[Dict]:
        """List all articles"""
        articles = []
        
        for article_dir in self.articles_dir.iterdir():
            if article_dir.is_dir():
                metadata_path = article_dir / "metadata.json"
                if metadata_path.exists():
                    with open(metadata_path, 'r') as f:
                        metadata = json.load(f)
                        articles.append(metadata)
        
        return sorted(articles, key=lambda x: x.get("created_at", ""), reverse=True)
    
    def get_article(self, article_id: str) -> Optional[Dict]:
        """Get the full content of a generated article"""
        article_dir = self.articles_dir / article_id
        
        if not article_dir.exists():
            return None
        
        metadata_path = article_dir / "metadata.json"
        article_path = article_dir / "storm_gen_article_polished.txt"
        outline_path = article_dir / "storm_gen_outline.txt"
        
        result = {}
        
        if metadata_path.exists():
            with open(metadata_path, 'r') as f:
                result.update(json.load(f))
        
        if article_path.exists():
            with open(article_path, 'r') as f:
                result["article_content"] = f.read()
        
        if outline_path.exists():
            with open(outline_path, 'r') as f:
                result["outline"] = f.read()
        
        return result
