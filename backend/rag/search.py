from backend.db.qdrant import get_qdrant_client, create_collection_if_not_exists, VECTOR_SIZE
from backend.rag.embeddings import get_embedding
from typing import List, Dict, Any

COLLECTION_NAME = "textbook_content"

async def search_similar_docs(query: str, limit: int = 5) -> List[Dict[str, Any]]:
    """
    Semantic search:
    1. Embed the user query.
    2. Search Qdrant for the closest vectors.
    3. Return the payload (text content) of the matches.
    """
    client = get_qdrant_client()
    create_collection_if_not_exists(COLLECTION_NAME, vector_size=VECTOR_SIZE)
    
    # 1. Embed query
    query_vector = await get_embedding(query)
    
    # 2. Search Qdrant
    if hasattr(client, "search"):
        # Legacy clients expose `search`
        search_result = client.search(
            collection_name=COLLECTION_NAME,
            query_vector=query_vector,
            limit=limit,
            with_payload=True,
            with_vectors=False  # We only need the text content
        )
        hits = search_result
    else:
        # Newer clients (>=1.16) renamed the method to `query_points`
        search_result = client.query_points(
            collection_name=COLLECTION_NAME,
            query=query_vector,
            limit=limit,
            with_payload=True,
            with_vectors=False
        )
        hits = search_result.points
    
    # 3. Format results
    results = []
    for hit in hits:
        payload = hit.payload or {}
        results.append({
            "text": payload.get("text", ""),
            "source": payload.get("source", ""),
            "title": payload.get("title", "Untitled"),
            "score": getattr(hit, "score", None)
        })
        
    return results
