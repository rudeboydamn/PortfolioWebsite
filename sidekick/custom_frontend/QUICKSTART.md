# 🚀 Sidekick Custom Frontend - Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Python 3.11+
- OpenAI API key (or Anthropic)
- You.com or Bing Search API key

## Installation

```bash
cd /Users/dammyhenry/CodingProjects/storm/custom_frontend
./setup.sh
```

## Configuration

Edit `.env` file:

```bash
nano .env

# Add your keys:
OPENAI_API_KEY=sk-proj-...
YOU_API_KEY=your_you_key_here
```

## Run

```bash
source venv/bin/activate
python main.py
```

Open: **http://localhost:8000**

## Test Sidekick

1. Go to http://localhost:8000/sidekick
2. Enter topic: "Quantum Computing"
3. Click "Generate Article"
4. Watch progress bar
5. View completed article

## Test mySidekick

1. Go to http://localhost:8000/mysidekick
2. Enter topic: "AI Ethics"
3. Start session
4. Ask: "What are the main concerns?"
5. Watch AI experts respond
6. See mind map update

## Troubleshooting

**Can't import knowledge_storm:**
```bash
cd ..
pip install -e .
cd custom_frontend
```

**Port 8000 in use:**
```bash
# Change in .env
PORT=8001
```

**No API key:**
- Get OpenAI key: https://platform.openai.com/api-keys
- Get You.com key: https://api.you.com
- Add to .env file

## Project Structure

```
custom_frontend/
├── main.py              # Run this!
├── api/                 # Endpoints
├── services/            # Sidekick logic
├── templates/           # HTML pages
└── static/              # CSS/JS
```

## API Testing

```bash
# Generate article
curl -X POST http://localhost:8000/api/sidekick/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Python Programming"}'

# Check status
curl http://localhost:8000/api/sidekick/status/ARTICLE_ID

# List articles
curl http://localhost:8000/api/sidekick/articles
```

## Development Mode

Hot reload enabled by default:
```bash
# Edit any file
# Server auto-reloads
# Refresh browser
```

## Common Issues

1. **ModuleNotFoundError: knowledge_storm**
   - Run: `cd .. && pip install -e . && cd custom_frontend`

2. **API key errors**
   - Check .env file has correct keys
   - No quotes around values
   - Restart server after editing .env

3. **Search engine not working**
   - Verify API key is valid
   - Check DEFAULT_SEARCH_ENGINE matches your key
   - Options: you, bing, serper, brave

## Next Steps

- [ ] Customize templates/base.html
- [ ] Add more search engines (see README)
- [ ] Improve citation formatting
- [ ] Add i18n support
- [ ] Deploy to production

## Support

- Check README.md for detailed docs
- Review PROJECT_STRUCTURE.md
- Contact Vale Technologies support

---

**Ready to generate knowledge!** 🎉
