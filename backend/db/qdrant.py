import os
from pathlib import Path
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.http import models

# Always load the .env from the backend directory (not the current working dir)
BACKEND_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BACKEND_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

_client = None
VECTOR_SIZE = 768  # text-embedding-004 returns 768-dim vectors

def get_qdrant_client() -> QdrantClient:
    global _client
    if _client is None:
        if not QDRANT_URL:
            raise ValueError("QDRANT_URL is not set in .env")
        
        if QDRANT_URL and (QDRANT_URL.startswith("http") or QDRANT_URL.startswith("https")):
            # Cloud/Server mode
            _client = QdrantClient(
                url=QDRANT_URL,
                api_key=QDRANT_API_KEY,
            )
        else:
            # Local mode
            print(f"Initializing local Qdrant at: {QDRANT_URL}")
            _client = QdrantClient(path=QDRANT_URL)
    return _client

def create_collection_if_not_exists(collection_name: str, vector_size: int = VECTOR_SIZE):
    """
    Creates a collection with Dot Product distance if it doesn't exist.
    Default vector size matches Gemini text-embedding-004 (768).
    """
    client = get_qdrant_client()
    collections = client.get_collections().collections
    exists = any(c.name == collection_name for c in collections)
    
    if not exists:
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=vector_size,
                distance=models.Distance.COSINE
            )
        )
        print(f"Collection '{collection_name}' created.")
    else:
        print(f"Collection '{collection_name}' already exists.")
