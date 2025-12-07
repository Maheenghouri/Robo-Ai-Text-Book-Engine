import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

aclient = AsyncOpenAI(api_key=OPENAI_API_KEY)

SYSTEM_PROMPT = """You are an expert AI Robotics Professor assisting a student with the "Robo Ai Text Book".
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
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"Context found in textbook:\n---\n{context}\n---\n\nStudent Question: {query}"}
    ]

    stream = await aclient.chat.completions.create(
        model="gpt-4o-mini", # Using cost-effective model for high speed
        messages=messages,
        stream=True
    )

    async for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            yield chunk.choices[0].delta.content
