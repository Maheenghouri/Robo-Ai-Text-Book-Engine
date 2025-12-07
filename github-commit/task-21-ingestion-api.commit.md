# GitHub Commit - Task 21

**Date**: 2025-12-08 03:09:00
**Type**: Task Execution

## Commit Title
feat: implement RAG ingestion pipeline

## Summary
Added `backend/rag` module containing embedding generation (OpenAI) and document processing logic. The `ingest_docs` function reads markdown files from the frontend, chunks them, and upserts them to the Qdrant Vector DB. Exposed via `POST /ingest` endpoint.

## Task Number
Task 21

## Files Modified
- `backend/rag/embeddings.py` (New)
- `backend/rag/ingest.py` (New)
- `backend/main.py` (Updated with endpoint)
- `tasks.md` (Updated status)

## Why change was needed
To allow the AI to "read" the textbook content so it can answer user questions based on the specific "Physical AI" curriculum we created.

## Ready-to-copy GitHub commit message
```bash
git add .
git commit -m "feat: implement RAG ingestion pipeline"
git push origin main
```
