import os
import glob
import uuid
from backend.db.qdrant import get_qdrant_client, create_collection_if_not_exists
from backend.rag.embeddings import get_embedding
from qdrant_client.http import models

COLLECTION_NAME = "textbook_content"

# Simple recursive character splitter logic since we don't have langchain
def chunk_text(text: str, max_chars=1000, overlap=100):
    chunks = []
    start = 0
    text_len = len(text)
    
    while start < text_len:
        end = start + max_chars
        if end >= text_len:
            chunks.append(text[start:])
            break
        
        # Try to find a newline or space to break at
        last_newline = text.rfind('\n', start, end)
        if last_newline != -1 and last_newline > start + (max_chars // 2):
            end = last_newline
        else:
            last_space = text.rfind(' ', start, end)
            if last_space != -1 and last_space > start + (max_chars // 2):
                end = last_space
        
        chunks.append(text[start:end])
        start = end - overlap
        
    return chunks

async def ingest_docs(docs_dir: str):
    """
    Reads markdown files from docs_dir, chunks them, embeds them, and upserts to Qdrant.
    """
    create_collection_if_not_exists(COLLECTION_NAME)
    client = get_qdrant_client()
    
    # Recursively find .md files
    # Note: We assume the backend is running from root or we pass absolute paths
    # Implementation running from root:
    # docs_dir is usually 'frontend/docs'
    
    search_pattern = os.path.join(docs_dir, "**", "*.md")
    files = glob.glob(search_pattern, recursive=True)
    
    total_chunks = 0
    
    print(f"Found {len(files)} markdown files in {docs_dir}")

    for file_path in files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Basic metadata extraction (frontmatter)
        # This is very naive, assuming frontmatter between --- and ---
        title = "Untitled"
        meta_content = ""
        
        lines = content.split('\n')
        if lines and lines[0].strip() == '---':
            # Extract frontmatter
            try:
                end_idx = lines.index('---', 1)
                frontmatter = lines[1:end_idx]
                for line in frontmatter:
                    if line.startswith('title:'):
                        title = line.split('title:')[1].strip()
                content = "\n".join(lines[end_idx+1:])
            except ValueError:
                pass
        
        chunks = chunk_text(content)
        
        for i, chunk in enumerate(chunks):
            embedding = await get_embedding(chunk)
            
            payload = {
                "source": file_path,
                "title": title,
                "chunk_index": i,
                "text": chunk
            }
            
            client.upsert(
                collection_name=COLLECTION_NAME,
                points=[
                    models.PointStruct(
                        id=str(uuid.uuid4()),
                        vector=embedding,
                        payload=payload
                    )
                ]
            )
            total_chunks += 1
            print(f"Ingested chunk {i} from {title}")

    return {"status": "success", "files_processed": len(files), "chunks_ingested": total_chunks}
