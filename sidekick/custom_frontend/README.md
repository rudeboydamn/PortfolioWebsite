# Sidekick Custom Frontend

A modern web interface for Sidekick and mySidekick built with **FastAPI**, **HTMX**, and **LangChain**.

## Features

- 🚀 **Sidekick**: Automated Wikipedia-style article generation
- 🤝 **mySidekick**: Real-time collaborative knowledge curation
- ⚡ **HTMX**: Dynamic, reactive UI without heavy JavaScript
- 🔌 **FastAPI**: High-performance async API
- 🔗 **LangChain**: Flexible search engine adapters

## Architecture

```
custom_frontend/
├── main.py                     # FastAPI application entry point
├── api/                        # API route handlers
│   ├── sidekick_routes.py     # Sidekick endpoints
│   └── mysidekick_routes.py   # mySidekick endpoints
├── services/                   # Business logic layer
│   ├── sidekick_service.py    # Sidekick article generation
│   └── mysidekick_service.py  # mySidekick collaboration
├── templates/                  # Jinja2 HTML templates
│   ├── base.html              # Base layout
│   ├── index.html             # Home page
│   ├── sidekick.html          # Sidekick interface
│   └── mysidekick.html        # mySidekick interface
└── static/                     # Static assets (CSS, JS)
```

## Quick Start

### 1. Run Setup Script

```bash
cd /Users/dammyhenry/CodingProjects/storm/custom_frontend
./setup.sh
```

### 2. Configure Environment

Edit `.env` file and add your API keys:

```bash
# Required
OPENAI_API_KEY=your_key_here
YOU_API_KEY=your_key_here  # or BING_API_KEY

# Optional
DEFAULT_SEARCH_ENGINE=you  # Options: you, bing, serper, brave, tavily
DEFAULT_LLM_MODEL=gpt-4
```

### 3. Run the Server

```bash
source venv/bin/activate
python main.py
```

Server will start at: **http://localhost:8000**

## API Endpoints

### Sidekick Endpoints

- `POST /api/sidekick/generate` - Start article generation
- `GET /api/sidekick/status/{article_id}` - Check generation status
- `GET /api/sidekick/articles` - List all articles
- `GET /api/sidekick/article/{article_id}` - Get article content

### mySidekick Endpoints

- `POST /api/mysidekick/session/create` - Create collaborative session
- `POST /api/mysidekick/message` - Send message
- `GET /api/mysidekick/session/{session_id}/mindmap` - Get mind map
- `GET /api/mysidekick/session/{session_id}/history` - Get conversation
- `WS /api/mysidekick/ws/{session_id}` - WebSocket for real-time updates

## Usage Examples

### Generate Article with Sidekick

```python
import requests

response = requests.post("http://localhost:8000/api/sidekick/generate", json={
    "topic": "Quantum Computing",
    "max_conv_turn": 3,
    "max_perspective": 3
})

article_id = response.json()["article_id"]

# Check status
status = requests.get(f"http://localhost:8000/api/sidekick/status/{article_id}")
print(status.json())
```

### Start mySidekick Session

```python
# Create session
session = requests.post("http://localhost:8000/api/mysidekick/session/create", json={
    "topic": "Artificial Intelligence Ethics",
    "user_name": "Researcher"
})

session_id = session.json()["session_id"]

# Send message
response = requests.post("http://localhost:8000/api/mysidekick/message", json={
    "session_id": session_id,
    "message": "What are the main ethical concerns?",
    "sender": "user"
})
```

## Technology Stack

- **Backend**: FastAPI 0.104+, Python 3.11+
- **Frontend**: HTMX 1.9, Alpine.js 3.x, Tailwind CSS
- **AI/ML**: LangChain, knowledge-storm, litellm
- **Search**: YouRM, BingSearch, or custom adapters

## Development

### Running Tests

```bash
pytest tests/
```

### Code Style

```bash
black .
flake8 .
```

### Hot Reload

Development mode enables auto-reload on file changes:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software of Vale Technologies.

## Troubleshooting

### Common Issues

**Import errors from knowledge_storm:**
```bash
cd .. && pip install -e . && cd custom_frontend
```

**Port already in use:**
```bash
# Change port in .env
PORT=8001
```

**Search engine not working:**
- Verify API keys in `.env`
- Check `DEFAULT_SEARCH_ENGINE` matches your available key

## Support

For issues and questions:
- Contact Vale Technologies support
- Check existing documentation

---

Built with ❤️ by Vale Technologies
