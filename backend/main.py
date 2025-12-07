from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from backend.models.chat import QueryRequest, QuerySelectedRequest

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

@app.post("/ingest")
async def start_ingestion():
    from backend.rag.ingest import ingest_docs
    # Assuming running from root or backend. 
    # Current CWD is usually root for 'python backend/main.py' or backend/ for 'uvicorn main:app'
    # We will try to locate frontend/docs relative to this file
    
    current_dir = os.path.dirname(os.path.abspath(__file__)) # .../backend
    root_dir = os.path.dirname(current_dir) # .../
    docs_path = os.path.join(root_dir, "frontend", "docs")
    
    if not os.path.exists(docs_path):
         return {"error": f"Docs directory not found at {docs_path}"}

    result = await ingest_docs(docs_path)
    return result

@app.post("/query")
async def query_textbook(request: QueryRequest):
    from backend.rag.search import search_similar_docs
    from backend.rag.generation import generate_answer_stream
    from fastapi.responses import StreamingResponse

    # 1. Search (Retrieve)
    docs = await search_similar_docs(request.query)
    
    # 2. Format Context
    context_text = "\n\n".join([f"source: {d['title']}\ncontent: {d['text']}" for d in docs])
    
    # 3. Generate (if stream is requested, which is default)
    # For simplicity in this demo, we always stream
    return StreamingResponse(generate_answer_stream(request.query, context_text), media_type="text/event-stream")

@app.post("/query-selected")
async def query_selected_text(request: QuerySelectedRequest):
    from backend.rag.generation import generate_answer_stream
    from fastapi.responses import StreamingResponse
    
    # 1. Use selected text as context
    context_text = f"Selected Text:\n{request.selected_text}"
    
    # 2. Generate
    return StreamingResponse(generate_answer_stream(request.query, context_text), media_type="text/event-stream")
