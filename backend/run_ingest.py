import asyncio
import os
import sys
from pathlib import Path

# Add project root to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.rag.ingest import ingest_docs
from dotenv import load_dotenv

# Load env
BACKEND_DIR = Path(__file__).resolve().parent
ENV_PATH = BACKEND_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

async def run_ingestion():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    docs_path = os.path.join(root_dir, "frontend", "docs")
    
    print(f"Ingesting from: {docs_path}")
    if not os.path.exists(docs_path):
        print(f"ERROR: Docs path not found at {docs_path}")
        return

    try:
        result = await ingest_docs(docs_path)
        print("Ingestion Result:", result)
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Ingestion FAILED: {e}")

if __name__ == "__main__":
    asyncio.run(run_ingestion())
