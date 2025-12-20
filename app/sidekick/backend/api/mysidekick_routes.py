from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import Optional, List, Dict
import sys
from pathlib import Path
import json

# Add parent directory to import knowledge_storm
parent_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(parent_dir))

from services.mysidekick_service import MySidekickService

router = APIRouter()
mysidekick_service = MySidekickService()


class CollaborativeSessionRequest(BaseModel):
    topic: str
    user_name: Optional[str] = "User"


class MessageRequest(BaseModel):
    session_id: str
    message: str
    sender: str  # 'user' or 'moderator' or 'expert'


class SessionResponse(BaseModel):
    session_id: str
    topic: str
    status: str
    message: str


@router.post("/session/create", response_model=SessionResponse)
async def create_session(request: CollaborativeSessionRequest):
    """
    Create a new mySidekick collaborative session
    """
    try:
        session_id = mysidekick_service.create_session(
            topic=request.topic,
            user_name=request.user_name
        )
        
        return SessionResponse(
            session_id=session_id,
            topic=request.topic,
            status="active",
            message="Collaborative session created"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/message")
async def send_message(request: MessageRequest):
    """
    Send a message in the collaborative session
    """
    try:
        response = mysidekick_service.process_message(
            session_id=request.session_id,
            message=request.message,
            sender=request.sender
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/session/{session_id}/mindmap")
async def get_mindmap(session_id: str):
    """
    Get the current mind map for the session
    """
    try:
        mindmap = mysidekick_service.get_mindmap(session_id)
        if not mindmap:
            raise HTTPException(status_code=404, detail="Session not found")
        return {"mindmap": mindmap}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/session/{session_id}/history")
async def get_conversation_history(session_id: str):
    """
    Get the conversation history for the session
    """
    try:
        history = mysidekick_service.get_conversation_history(session_id)
        if history is None:
            raise HTTPException(status_code=404, detail="Session not found")
        return {"history": history}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search-engines")
async def get_available_search_engines():
    """
    Get list of available search engines based on configured API keys
    """
    try:
        engines = mysidekick_service.get_available_search_engines()
        return {"engines": engines}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class SwitchSearchEngineRequest(BaseModel):
    engine: str


@router.post("/search-engines/switch")
async def switch_search_engine(request: SwitchSearchEngineRequest):
    """
    Switch to a different search engine
    """
    try:
        mysidekick_service.switch_search_engine(request.engine)
        return {"success": True, "message": f"Switched to {request.engine} search engine"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    """
    WebSocket endpoint for real-time mySidekick collaboration
    """
    await websocket.accept()
    mysidekick_service.add_websocket(session_id, websocket)
    
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Process the message and broadcast to all connected clients
            response = mysidekick_service.process_message(
                session_id=session_id,
                message=message_data.get("message"),
                sender=message_data.get("sender", "user")
            )
            
            # Broadcast response to all clients in this session
            await mysidekick_service.broadcast_to_session(session_id, response)
            
    except WebSocketDisconnect:
        mysidekick_service.remove_websocket(session_id, websocket)
    except Exception as e:
        await websocket.close(code=1011, reason=str(e))
