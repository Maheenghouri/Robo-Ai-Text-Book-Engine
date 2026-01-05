import asyncio, traceback
from backend.rag.generation import generate_answer_stream

async def main():
    try:
        async for chunk in generate_answer_stream('Hi there',''):
            print('chunk', repr(chunk))
    except Exception as exc:
        traceback.print_exc()

asyncio.run(main())
