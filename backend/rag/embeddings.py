import os
from pathlib import Path
import google.generativeai as genai
from dotenv import load_dotenv

# Ensure .env is loaded regardless of where the process starts
BACKEND_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BACKEND_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

async def get_embedding(text: str, model="models/text-embedding-004"):
    # Gemini embedding model supports task_type, but default is usually fine for general retrieval
    result = genai.embed_content(
        model=model,
        content=text,
        task_type="retrieval_document",
        title=None
    )
    return result['embedding']
