# Sidekick Custom Frontend - Complete Project Structure

```
custom_frontend/                      # YOUR FASTAPI + HTMX APPLICATION
├── main.py                          # FastAPI app entry point
├── requirements.txt                 # Python dependencies
├── setup.sh                         # Automated setup script
├── .env.example                     # Environment variables template
├── README.md                        # Complete documentation
│
├── api/                             # API Routes Layer
│   ├── __init__.py
│   ├── sidekick_routes.py          # Sidekick endpoints
│   └── mysidekick_routes.py        # mySidekick endpoints
│
├── services/                        # Business Logic Layer
│   ├── __init__.py
│   ├── sidekick_service.py         # Sidekick article generation logic
│   └── mysidekick_service.py       # mySidekick collaboration logic
│
├── templates/                       # Jinja2 HTML Templates
│   ├── base.html                   # Base layout with nav
│   ├── index.html                  # Landing page
│   ├── sidekick.html               # Article generation UI
│   └── mysidekick.html             # Collaborative interface
│
├── static/                          # Static Assets
│   └── styles.css                  # Custom CSS
│
└── articles/                        # Generated content (auto-created)
    └── [article_id]/
        ├── metadata.json
        ├── storm_gen_outline.txt
        └── storm_gen_article_polished.txt

## Technology Stack

### Backend
- **FastAPI**: Modern, async web framework
- **Pydantic**: Data validation
- **Python 3.11+**: Core language

### Frontend
- **HTMX**: Dynamic HTML without heavy JS
- **Alpine.js**: Lightweight reactive framework
- **Tailwind CSS**: Utility-first CSS

### AI/ML
- **knowledge-storm**: Core library
- **LangChain**: Search engine integrations
- **litellm**: Multi-LLM support
- **dspy**: Pipeline implementation

### Search Engines (Choose one)
- You.com (YouRM)
- Bing Search
- Serper
- Brave
- Tavily
- Google Search

## API Endpoints Summary

### Sidekick (/api/sidekick)
- POST /generate - Start article generation
- GET /status/{id} - Check progress
- GET /articles - List all articles
- GET /article/{id} - Get article content

### mySidekick (/api/mysidekick)
- POST /session/create - New session
- POST /message - Send message
- GET /session/{id}/mindmap - Get mind map
- GET /session/{id}/history - Get chat history
- WS /ws/{id} - WebSocket connection

## File Responsibilities

### main.py
- FastAPI app initialization
- CORS middleware
- Route registration
- Static files mounting
- Health check endpoint

### sidekick_routes.py
- Article generation endpoint
- Status polling endpoint
- Article listing and retrieval
- Background task management

### mysidekick_routes.py
- Session creation
- Message handling
- Mind map retrieval
- WebSocket management

### sidekick_service.py
- Sidekick engine initialization
- LLM configuration
- Search engine setup
- Article generation workflow
- Progress tracking
- File management

### mysidekick_service.py
- mySidekick session management
- Conversation handling
- Expert response generation
- Mind map updates
- WebSocket broadcasting

## Data Flow

### Sidekick Article Generation
1. User submits topic via form (HTMX POST)
2. sidekick_routes creates job, returns article_id
3. Background task starts Sidekick engine
4. sidekick_service runs pre-writing stage
5. Generates outline
6. Runs writing stage
7. Polishes article
8. Saves to articles/ directory
9. Frontend polls /status endpoint
10. Displays completed article

### mySidekick Collaboration
1. User creates session (REST API)
2. WebSocket connection established
3. User sends message via form
4. mysidekick_service processes message
5. Searches for information (RM)
6. Generates expert response (LLM)
7. Updates mind map structure
8. Broadcasts via WebSocket
9. Frontend updates conversation + mindmap

## Environment Variables Required

```bash
# Essential
OPENAI_API_KEY=sk-...
YOU_API_KEY=...          # OR
BING_API_KEY=...         # Choose one

# Optional
DEFAULT_SEARCH_ENGINE=you
DEFAULT_LLM_MODEL=gpt-4
DEFAULT_TEMPERATURE=0.7
PORT=8000
DEBUG=True
```

## Next Steps After Setup

1. ✅ Run setup.sh
2. ✅ Configure .env with API keys
3. ✅ Start server: python main.py
4. ✅ Test Sidekick at http://localhost:8000/sidekick
5. ✅ Test mySidekick at http://localhost:8000/mysidekick
6. 🚀 Customize styling in static/styles.css
7. 📱 Add mobile responsiveness
8. 🔒 Add authentication (if needed)
9. �� Deploy to production
```

---

© 2025 Vale Technologies
