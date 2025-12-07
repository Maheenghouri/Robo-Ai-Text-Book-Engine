# GitHub Commit - Task 26

**Date**: 2025-12-08 03:50:00
**Type**: Task Execution

## Commit Title
feat: connect chatbot to backend rag api

## Summary
Replaced the mock chatbot response logic with a real connection to the FastAPI backend. Implemented a streaming response handler using the Fetch API and ReadableStreams to display AI-generated answers in real-time as they are streamed from the server.

## Task Number
Task 26

## Files Modified
- `frontend/src/components/Chatbot.tsx` (Logic Update)
- `tasks.md` (Updated status)

## Why change was needed
To enable the actual "Physical AI" features where the chatbot uses the textbook content to answer student questions.

## Ready-to-copy GitHub commit message
```bash
git add .
git commit -m "feat: connect chatbot to backend rag api"
git push origin main
```
