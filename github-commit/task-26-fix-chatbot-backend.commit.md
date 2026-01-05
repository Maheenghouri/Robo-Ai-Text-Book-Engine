# Commit: Fix Chatbot Backend & Switch to Local Qdrant

**Task Number**: 26

**Summary**: 
Resolved chatbot connection failures by migrating from Qdrant Cloud (404) to a local file-based vector database and upgrading Gemini model dependencies.

**Files Modified**:
- `backend/.env`
- `backend/db/qdrant.py`
- `backend/rag/generation.py`
- `backend/requirements.txt`
- `run_backend.bat` (New)
- `backend/run_ingest.py` (New)

**Why Change Was Needed**:
The cloud vector database was unreachable, causing the chatbot to fail. Using a local database ensures reliability. Providing a startup script prevents environment mismatch errors.

**Git Commit Message**:
```bash
fix(backend): switch to local qdrant and repair chatbot pipeline

- change QDRANT_URL to local ./qdrant_data
- update qdrant.py to support local path
- update gemini model to 2.5-flash and upgrade sdk
- add robust startup script run_backend.bat
- re-ingest initial content
```

**Description**:
Migrated from Qdrant Cloud to local storage to fix 404 connectivity errors. Updated Google GenAI dependency to support newer models. Added batch scripts to simplify backend startup process.
