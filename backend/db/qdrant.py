import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.http import models

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

_client = None

def get_qdrant_client() -> QdrantClient:
    global _client
    if _client is None:
        if not QDRANT_URL:
            raise ValueError("QDRANT_URL is not set in .env")
        
        _client = QdrantClient(
            url=QDRANT_URL,
            api_key=QDRANT_API_KEY,
        )
    return _client

def create_collection_if_not_exists(collection_name: str, vector_size: int = 1536):
    """
    Creates a collection with Dot Product distance if it doesn't exist.
    Default vector size 1536 (OpenAI text-embedding-3-small).
    """
    client = get_qdrant_client()
    collections = client.get_collections().collections
    exists = any(c.name == collection_name for c in collections)
    
    if not exists:
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=vector_size,
                distance=models.Distance.DOT
            )
        )
        print(f"Collection '{collection_name}' created.")
    else:
        print(f"Collection '{collection_name}' already exists.")
