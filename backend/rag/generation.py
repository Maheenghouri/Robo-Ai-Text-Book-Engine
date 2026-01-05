import os
from pathlib import Path
import google.generativeai as genai
from dotenv import load_dotenv

# Ensure .env is loaded regardless of the working directory
BACKEND_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BACKEND_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Gemini System Instructions are prepended to the prompt for broader SDK compatibility
SYSTEM_INSTRUCTION = """You are an expert AI Robotics Professor assisting a student with the "Robo Ai Text Book".
Your goal is to answer questions based STRICTLY on the provided context from the textbook modules.

If the context does not contain the answer, acknowledge that it's not in the current textbook material but try to answer from general robotics knowledge, EXPLICITLY stating "This isn't in the provided text, but..."

Modules in the book:
1. The Robotic Nervous System (ROS 2)
2. The Digital Twin (Simulation)
3. The Brain (NVIDIA Isaac)
4. The Body (VLA Models)

Keep answers concise, technical, and encouraging. Use Markdown formatting.
"""

async def generate_answer_stream(query: str, context: str):
    """
    Generates a streaming response to the user query using the provided context.
    """
    model = genai.GenerativeModel(
        model_name="models/gemini-2.5-flash",
    )
    
    # Construct the prompt with context
    prompt = f"""{SYSTEM_INSTRUCTION}

Context found in textbook:
---
{context}
---

Student Question: {query}"""

    response = await model.generate_content_async(prompt, stream=True)

    async for chunk in response:
        if chunk.text:
            yield chunk.text
