import asyncio
import os
import sys
from pathlib import Path

# Add project root to sys.path
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
try:
    print("Importing Qdrant...")
    from backend.db.qdrant import get_qdrant_client
    COLLECTION_NAME = "textbook_content"
    print("Qdrant Imported.")
    
    print("Importing Generation...")
    from backend.rag.generation import generate_answer_stream
    print("Generation Imported.")

    print("Importing Search...")
    from backend.rag.search import search_similar_docs
    print("Search Imported.")

    from dotenv import load_dotenv
except ImportError as e:
    import traceback
    with open("backend/error_log.txt", "w") as f:
        traceback.print_exc(file=f)
    print("----------------------------------------------------------------")
    print(f"CRITICAL IMPORT ERROR: {e}")
    exit(1)
    import traceback
    traceback.print_exc()
    print(f"CRITICAL IMPORT ERROR: {e}")
    exit(1)

# Load env
BACKEND_DIR = Path(__file__).resolve().parent
ENV_PATH = BACKEND_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

async def test_full_pipeline():
    print("--- 1. Testing Qdrant Connection ---")
    try:
        client = get_qdrant_client()
        collections = client.get_collections()
        print("Success! Collections found:", [c.name for c in collections.collections])
        
        # Check if our collection exists
        exists = any(c.name == COLLECTION_NAME for c in collections.collections)
        if not exists:
            print(f"WARNING: Collection '{COLLECTION_NAME}' does not exist! Ingestion needed.")
        else:
            print(f"Collection '{COLLECTION_NAME}' exists.")
            count = client.count(COLLECTION_NAME).count
            print(f"Document chunks count: {count}")
            if count == 0:
                print("WARNING: Collection is empty!")

    except Exception as e:
        print(f"FAILED to connect to Qdrant: {e}")
        return

    print("\n--- 2. Testing Search (Retrieval) ---")
    query = "What is ROS 2?"
    try:
        docs = await search_similar_docs(query)
        print(f"Found {len(docs)} documents.")
        for i, d in enumerate(docs):
            print(f"[{i}] {d['title']}: {d['text'][:50]}...")
    except Exception as e:
        print(f"FAILED Retrieval: {e}")
        return

    print("\n--- 3. Testing Generation (Gemini) ---")
    context_text = "ROS 2 is the Robot Operating System version 2."
    if docs:
        context_text = "\n\n".join([f"source: {d['title']}\ncontent: {d['text']}" for d in docs])
    
    try:
        print("Stream output:")
        async for chunk in generate_answer_stream(query, context_text):
            print(chunk, end="", flush=True)
        print("\nSuccess!")
    except Exception as e:
        print(f"\nFAILED Generation: {e}")

if __name__ == "__main__":
    asyncio.run(test_full_pipeline())
