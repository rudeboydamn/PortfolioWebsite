from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List, Dict
import sys
from pathlib import Path

# Add parent directory to import knowledge_storm
parent_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(parent_dir))

from services.sidekick_service import SidekickService

router = APIRouter()
sidekick_service = SidekickService()


class ArticleRequest(BaseModel):
    topic: str
    max_conv_turn: Optional[int] = 3
    max_perspective: Optional[int] = 3
    search_top_k: Optional[int] = 5
    max_search_queries: Optional[int] = 3
    

class ArticleResponse(BaseModel):
    article_id: str
    topic: str
    status: str
    message: str


class ArticleStatus(BaseModel):
    article_id: str
    status: str
    progress: int
    current_stage: str
    outline: Optional[Dict] = None
    article_content: Optional[str] = None


@router.post("/generate", response_model=ArticleResponse)
async def generate_article(
    request: ArticleRequest,
    background_tasks: BackgroundTasks
):
    """
    Start generating a Wikipedia-style article using Sidekick
    """
    try:
        article_id = sidekick_service.create_article_job(request.topic)
        
        # Run article generation in background
        background_tasks.add_task(
            sidekick_service.generate_article,
            article_id=article_id,
            topic=request.topic,
            max_conv_turn=request.max_conv_turn,
            max_perspective=request.max_perspective,
            search_top_k=request.search_top_k,
            max_search_queries=request.max_search_queries
        )
        
        return ArticleResponse(
            article_id=article_id,
            topic=request.topic,
            status="started",
            message="Article generation started"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status/{article_id}", response_model=ArticleStatus)
async def get_article_status(article_id: str):
    """
    Get the current status of article generation
    """
    try:
        status = sidekick_service.get_article_status(article_id)
        if not status:
            raise HTTPException(status_code=404, detail="Article not found")
        return status
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/articles")
async def list_articles():
    """
    List all generated articles
    """
    try:
        articles = sidekick_service.list_articles()
        return {"articles": articles}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/article/{article_id}")
async def get_article(article_id: str):
    """
    Get the full content of a generated article
    """
    try:
        article = sidekick_service.get_article(article_id)
        if not article:
            raise HTTPException(status_code=404, detail="Article not found")
        return article
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
