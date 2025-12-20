from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path
from dotenv import load_dotenv
import sys

# Load environment variables
load_dotenv()

# Add parent directory to path to import knowledge_storm
parent_dir = Path(__file__).parent.parent
sys.path.insert(0, str(parent_dir))

from api import sidekick_routes, mysidekick_routes

# Initialize FastAPI app
app = FastAPI(
    title="Sidekick & mySidekick API",
    description="Web interface for Sidekick knowledge generation",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Include routers
app.include_router(sidekick_routes.router, prefix="/api/sidekick", tags=["Sidekick"])
app.include_router(mysidekick_routes.router, prefix="/api/mysidekick", tags=["mySidekick"])

# Create necessary directories
os.makedirs("articles", exist_ok=True)
os.makedirs("temp", exist_ok=True)


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Serve the main page"""
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/sidekick", response_class=HTMLResponse)
async def sidekick_page(request: Request):
    """Serve Sidekick article generation page"""
    return templates.TemplateResponse("sidekick.html", {"request": request})


@app.get("/mysidekick", response_class=HTMLResponse)
async def mysidekick_page(request: Request):
    """Serve mySidekick collaborative page"""
    return templates.TemplateResponse("mysidekick.html", {"request": request})


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Sidekick API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("DEBUG", "True").lower() == "true"
    )
