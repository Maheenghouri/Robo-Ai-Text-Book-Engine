import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

aclient = AsyncOpenAI(api_key=OPENAI_API_KEY)

async def get_embedding(text: str, model="text-embedding-3-small"):
    text = text.replace("\n", " ")
    response = await aclient.embeddings.create(input=[text], model=model)
    return response.data[0].embedding
