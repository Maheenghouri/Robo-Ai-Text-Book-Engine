from backend.db.qdrant import get_qdrant_client
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
    
    # 1. Embed query
    query_vector = await get_embedding(query)
    
    # 2. Search Qdrant
    search_result = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=limit,
        with_payload=True,
        with_vectors=False # We only need the text content
    )
    
    # 3. Format results
    results = []
    for hit in search_result:
        results.append({
            "text": hit.payload.get("text", ""),
            "source": hit.payload.get("source", ""),
            "title": hit.payload.get("title", "Untitled"),
            "score": hit.score
        })
        
    return results
