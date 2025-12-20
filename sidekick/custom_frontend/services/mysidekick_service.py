import os
import uuid
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Optional, List
import sys
from fastapi import WebSocket

# Add parent directory to import knowledge_storm
parent_dir = Path(__file__).parent.parent.parent
sys.path.insert(0, str(parent_dir))

from knowledge_storm.collaborative_storm.engine import CollaborativeStormLMConfigs
from knowledge_storm.lm import LitellmModel
from knowledge_storm.rm import YouRM, BingSearch


class MySidekickService:
    def __init__(self):
        self.sessions_dir = Path("temp/mysidekick_sessions")
        self.sessions_dir.mkdir(parents=True, exist_ok=True)
        
        self.sessions: Dict[str, Dict] = {}
        self.websockets: Dict[str, List[WebSocket]] = {}
        
        # Initialize LM configs for mySidekick
        self.lm_configs = CollaborativeStormLMConfigs()
        
        # Setup language models using the init method
        openai_api_key = os.getenv("OPENAI_API_KEY")
        if openai_api_key:
            self.lm_configs.init(lm_type="openai")
        
        # Setup retrieval module
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
    
    def create_session(self, topic: str, user_name: str = "User") -> str:
        """Create a new collaborative session"""
        session_id = str(uuid.uuid4())
        
        self.sessions[session_id] = {
            "session_id": session_id,
            "topic": topic,
            "user_name": user_name,
            "status": "active",
            "created_at": datetime.now().isoformat(),
            "conversation_history": [],
            "mindmap": {
                "nodes": [{"id": "root", "label": topic, "children": []}],
                "edges": []
            }
        }
        
        self.websockets[session_id] = []
        
        # Save session
        self._save_session(session_id)
        
        return session_id
    
    def process_message(self, session_id: str, message: str, sender: str) -> Dict:
        """Process a message in the collaborative session"""
        if session_id not in self.sessions:
            raise ValueError(f"Session {session_id} not found")
        
        session = self.sessions[session_id]
        
        # Add user message to history
        message_entry = {
            "timestamp": datetime.now().isoformat(),
            "sender": sender,
            "message": message,
            "response": None
        }
        
        session["conversation_history"].append(message_entry)
        
        # Generate response based on sender type
        if sender == "user":
            # User message - generate expert response
            response = self._generate_expert_response(session_id, message)
            message_entry["response"] = response
            
            # Update mindmap with new information
            self._update_mindmap(session_id, message, response)
            
        elif sender == "moderator":
            # Moderator asking question - generate expert responses
            response = self._generate_expert_response(session_id, message)
            message_entry["response"] = response
        
        # Save session
        self._save_session(session_id)
        
        return {
            "session_id": session_id,
            "message": message,
            "response": response,
            "mindmap": session["mindmap"]
        }
    
    def _generate_expert_response(self, session_id: str, question: str) -> str:
        """Generate expert response grounded in search results"""
        session = self.sessions[session_id]
        topic = session["topic"]
        
        # Search for relevant information
        try:
            search_results = self.rm.retrieve(query=question, k=3)
            
            # Simple response generation (in production, use mySidekick engine)
            response = f"Based on research about {topic}: "
            if search_results:
                response += f"According to sources, {question} "
                response += "Here's what we found... [This would be a detailed response]"
            else:
                response += "I'll need to gather more information on this aspect."
            
            return response
            
        except Exception as e:
            return f"I encountered an error while researching: {str(e)}"
    
    def _update_mindmap(self, session_id: str, question: str, response: str):
        """Update the mindmap with new concepts"""
        session = self.sessions[session_id]
        
        # Simple mindmap update (in production, use proper concept extraction)
        # Extract key concepts and add as nodes
        new_node_id = str(uuid.uuid4())[:8]
        
        # Add concept as a child of root
        concept = question[:50] + "..." if len(question) > 50 else question
        
        session["mindmap"]["nodes"].append({
            "id": new_node_id,
            "label": concept,
            "children": []
        })
        
        session["mindmap"]["edges"].append({
            "from": "root",
            "to": new_node_id
        })
    
    def get_mindmap(self, session_id: str) -> Optional[Dict]:
        """Get the current mindmap for the session"""
        session = self.sessions.get(session_id)
        return session["mindmap"] if session else None
    
    def get_conversation_history(self, session_id: str) -> Optional[List[Dict]]:
        """Get the conversation history for the session"""
        session = self.sessions.get(session_id)
        return session["conversation_history"] if session else None
    
    def add_websocket(self, session_id: str, websocket: WebSocket):
        """Add a websocket connection to a session"""
        if session_id not in self.websockets:
            self.websockets[session_id] = []
        self.websockets[session_id].append(websocket)
    
    def remove_websocket(self, session_id: str, websocket: WebSocket):
        """Remove a websocket connection from a session"""
        if session_id in self.websockets:
            self.websockets[session_id].remove(websocket)
    
    async def broadcast_to_session(self, session_id: str, message: Dict):
        """Broadcast a message to all websockets in a session"""
        if session_id in self.websockets:
            for websocket in self.websockets[session_id]:
                try:
                    await websocket.send_json(message)
                except Exception:
                    pass  # Connection might be closed
    
    def _save_session(self, session_id: str):
        """Save session to disk"""
        session = self.sessions[session_id]
        session_path = self.sessions_dir / f"{session_id}.json"
        
        with open(session_path, 'w') as f:
            json.dump(session, f, indent=2)
