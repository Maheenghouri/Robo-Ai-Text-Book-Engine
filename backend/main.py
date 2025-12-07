from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Robo Ai Text Book Engine API",
    description="Backend for the Physical AI Textbook",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "robo-ai-backend"}

@app.get("/")
async def root():
    return {"message": "Welcome to Robo Ai Text Book Engine API"}
