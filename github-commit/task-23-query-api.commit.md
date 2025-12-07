# GitHub Commit - Task 23

**Date**: 2025-12-08 03:22:00
**Type**: Task Execution

## Commit Title
feat: implement RAG query endpoints

## Summary
Completed the RAG engine by adding generation logic (`backend/rag/generation.py`) and API endpoints (`/query`, `/query-selected`). The system now performs a full Retrieve-Then-Generate loop, streaming the answer back to the client.

## Task Number
Task 23

## Files Modified
- `backend/models/chat.py` (New)
- `backend/rag/generation.py` (New)
- `backend/main.py` (Updated Endpoints)
- `tasks.md` (Updated status - Section 6 Complete)

## Why change was needed
To allow the frontend to actually ask questions to the textbook and get AI-generated answers based on the content.

## Ready-to-copy GitHub commit message
```bash
git add .
git commit -m "feat: implement RAG query endpoints"
git push origin main
```
