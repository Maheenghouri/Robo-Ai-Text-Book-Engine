spec-kit plus ma apny

# INFO.md — Master Specification for Autonomous Codex Agent

# Project: Robo Ai Text Book Engine

# Mode: FULL PROJECT REQUIREMENTS + INSTALLATION FIRST + LATEST NEXT.JS + TYPESCRIPT + TAILWIND + FASTAPI BACKEND + RAG + HISTORY SYSTEM

# Version: Ultra Pro Max — Hackathon Edition (Reset)

Codex MUST read this file completely before generating anything.
This file defines EVERYTHING Codex must do, including:

frontend/
src/pages/
components/
styles/
static/

Codex MUST build:

- Homepage (src/pages/index.tsx)
- Chapter pages (docs/)
- Module sidebar (sidebars.ts)
- installation requirements
- frameworks
- folder structure
- how tasks.md must be generated
- how tasks must be executed
- how history files must be created
- how GitHub commit files must be generated
- what questions Codex must ask the user
- how progress must be tracked

Codex MUST treat this file as the ONLY TRUTH SOURCE for the entire project.

──────────────────────────────────────────────────────────────

# 1. PROJECT TITLE

**Robo Ai Text Book Engine**

──────────────────────────────────────────────────────────────

# 2. HIGH‑LEVEL GOAL

Build a complete AI‑native robotics learning engine using:

- **Docusaurus (Classic Preset)**
- **React**
- **Infima (Default Docusaurus Styling)**
- **FastAPI backend**
- **Qdrant Cloud Vector DB**
- **Neon Postgres**
- **OpenAI embeddings + RAG architecture**
- **Autonomous Codex Agent Workflow**

System output includes:
✔ Full robotics textbook
✔ RAG chatbot (OpenAI Agents/ChatKit SDKs)
✔ FastAPI backend
✔ Task automation
✔ History logging
✔ GitHub commit message generation per task
✔ **Agent Skills & Subagents (Bonus Integration)**
✔ **Better Auth Integration**
✔ **Personalization & Urdu Translation**

──────────────────────────────────────────────────────────────

# 3. PROJECT REQUIREMENTS (Codex MUST Follow)

## 3.0 Methodology: Spec-Kit Plus & Claude Code

Codex MUST adhere to the **Spec-Kit Plus** methodology:

- **Templates**: Use templates from `spec-kit/templates/` for new features.
- **Spec-Driven**: All features must be defined in `info.md` or separate spec files before implementation.
- **Claude Code**: Codex acts as the "Claude Code" agent, following the autonomous workflow.

## 3.1 Frontend Requirements

Codex MUST use:

### ✔ Framework

- **Docusaurus (latest)**
- **React**
- **Infima CSS**
- **TailwindCSS (v3)**

### ✔ Pages / Sections

- **Landing Page**: High-impact visual design featuring "Future of Work", "Physical AI", and "Humanoid Robotics". Must include "Get Started" and "Learn More" CTAs.
- **Authentication**: Signup and Signin using **Better Auth** (https://www.better-auth.com/).
  - **Signup Flow**: MUST ask for **Software** and **Hardware** background to enable personalization.
- **Docs/Textbook Portal**: A structured reader interface for the "Physical AI & Humanoid Robotics" book.
- **User Dashboard**: "Command Center" style dashboard.

### ✔ UI Components Required

- Sidebar navigation
- Floating chatbot button
- Chat popup window
- Markdown renderer
- Top navigation bar
- Search box
- **Personalize Content Button**: At the start of each chapter.
- **Translate to Urdu Button**: At the start of each chapter.

### ✔ Frontend Features

- Ask AI anything (global context)
- Ask AI on selected text
- AI streaming responses
- **Urdu translation toggle** (Bonus)
- **Personalized learning mode** (Bonus)
- **Secure Authentication (Better Auth)**

---

## 3.2 Backend Requirements

Codex MUST generate a clean FastAPI backend:

### Backend Responsibilities

- document ingestion
- embedding generation
- vector search
- selected-text search
- streaming responses
- **User Authentication & Session Management**

### Databases

- **Qdrant Cloud** → vector DB
- **Neon** → relational DB

### Embeddings

- Use **OpenAI latest embedding model**.

### API Endpoints

- `/health`
- `/ingest`
- `/embed`
- `/query`
- `/query-selected`
- `/auth/login`
- `/auth/signup`
- `/auth/me`
- `/personalize` (New)
- `/translate` (New)

──────────────────────────────────────────────────────────────

# 4. INSTALLATION REQUIREMENTS (Codex MUST Begin Here)

## 4.1 Create Docusaurus App

Codex MUST run or generate:

```
npx create-docusaurus@latest frontend classic --typescript
```

This MUST produce:

```
frontend/
```

Codex MUST verify:

- docusaurus.config.ts
- docs directory present
- src directory present

---

## 4.2 Install Required Frontend Libraries

```
npm install @docusaurus/core @docusaurus/preset-classic clsx react-markdown remark-gfm
```

---

## 4.3 Backend Environment Setup

Codex MUST create folder:

```
backend/
```

Inside it:

```
python -m venv venv
pip install fastapi uvicorn qdrant-client python-dotenv openai psycopg[binary]
```

---

## 4.4 Connect All Systems

Codex MUST ensure:

- Next.js → FastAPI communication
- FastAPI → Qdrant connection
- FastAPI → Neon connection
- Proper RAG embedding pipeline
- Query pipeline (full + selected text)

──────────────────────────────────────────────────────────────

# 5. FOLDER STRUCTURE Codex MUST CREATE

```
/
├── info.md
├── instructions.md
├── tasks.md
├── requirements.md
├── history/
│   └── prompts/
├── github-commit/
├── frontend/
│   ├── docs/
│   ├── blog/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── css/
│   ├── docusaurus.config.ts
│   └── static/
└── backend/
    ├── main.py
    ├── rag/
    ├── db/
    └── models/
```

Codex may extend but MUST NOT break structure.

──────────────────────────────────────────────────────────────

# 6. COURSE CONTENT REQUIREMENTS

Codex MUST generate chapters for:

### Module 1 — The Robotic Nervous System (ROS 2)

- Middleware for robot control.
- ROS 2 Nodes, Topics, and Services.
- Bridging Python Agents to ROS controllers using rclpy.
- Understanding URDF (Unified Robot Description Format) for humanoids.

### Module 2 — The Digital Twin (Gazebo & Unity)

- Physics simulation and environment building.
- Simulating physics, gravity, and collisions in Gazebo.
- High-fidelity rendering and human-robot interaction in Unity.
- Simulating sensors: LiDAR, Depth Cameras, and IMUs.

### Module 3 — The AI-Robot Brain (NVIDIA Isaac™)

- Advanced perception and training.
- NVIDIA Isaac Sim: Photorealistic simulation and synthetic data generation.
- Isaac ROS: Hardware-accelerated VSLAM (Visual SLAM) and navigation.
- Nav2: Path planning for bipedal humanoid movement.

### Module 4 — Vision-Language-Action (VLA)

- The convergence of LLMs and Robotics.
- Voice-to-Action: Using OpenAI Whisper for voice commands.
- Cognitive Planning: Using LLMs to translate natural language ("Clean the room") into a sequence of ROS 2 actions.
- Capstone Project: The Autonomous Humanoid.

Chapters MUST be produced as markdown inside the frontend.

──────────────────────────────────────────────────────────────

# 7. TASK SYSTEM (Codex MUST Generate tasks.md EXACTLY THIS WAY)

tasks.md MUST be:

- Sorted
- Numbered
- Checkbox-enabled
- Editable
- Progress-trackable

### REQUIRED STRUCTURE:

```
# Tasks

## 1. Setup & Installation
- [ ] Task 1: Initialize Docusaurus Project (TypeScript + Classic Preset)
- [ ] Task 2: Clean Default Template & Install Dependencies (clsx, icons, etc.)
- [ ] Task 3: Configure `docusaurus.config.ts` (Metadata, Navbar, Footer, Color Mode)

## 2. Frontend: Landing Page & Design
- [ ] Task 4: Design Global Layout & Theme (Infima Customization, Fonts)
- [ ] Task 5: Build Custom Homepage `src/pages/index.tsx` (Hero, Features, CTA)
- [ ] Task 6: Implement "Future of Work" Visuals & Animations

## 3. Frontend: Authentication (Better Auth Integration)
- [ ] Task 7: Create Login Page `src/pages/login.tsx` (UI & Form Validation)
- [ ] Task 8: Create Signup Page `src/pages/signup.tsx` (UI & Form Validation)
- [ ] Task 9: Create User Dashboard `src/pages/dashboard.tsx` (Protected Route UI)
- [ ] Task 10: Implement Better Auth & Personalization Logic (Context/Hooks)
    - [ ] Subtask: Integrate Better Auth (or simulate if library unavailable)
    - [ ] Subtask: Add "Background" questions to Signup
    - [ ] Subtask: Store user preferences for personalization

## 4. Content: Textbook & Documentation
- [ ] Task 11: Configure Sidebar Structure (`sidebars.ts`)
- [ ] Task 12: Create Module 1 Content: ROS 2 (Markdown Structure)
- [ ] Task 13: Create Module 2 Content: Digital Twin (Gazebo/Unity)
- [ ] Task 14: Create Module 3 Content: NVIDIA Isaac
- [ ] Task 15: Create Module 4 Content: Vision-Language-Action

## 5. Frontend: Advanced Features (Bonus)
- [ ] Task 16: Implement "Personalize Content" Button (Chapter Header)
- [ ] Task 17: Implement "Translate to Urdu" Button (Chapter Header)
- [ ] Task 18: Implement Agent Skills & Subagents Logic

## 6. Backend: FastAPI & RAG Engine
- [ ] Task 19: Initialize FastAPI Backend (Folder Structure, Venv, Dependencies)
- [ ] Task 20: Setup Database Connections (Qdrant & Neon Postgres)
- [ ] Task 21: Implement Document Ingestion API (`/ingest`)
- [ ] Task 22: Implement Embedding & Vector Search Pipeline
- [ ] Task 23: Create Query API Endpoints (`/query`, `/query-selected`)

## 7. Chatbot Integration
- [ ] Task 24: Build Floating Chatbot Component (`src/components/Chatbot.tsx`)
- [ ] Task 25: Implement Chat UI (Message List, Input, Loading States)
- [ ] Task 26: Connect Chatbot to Backend API
- [ ] Task 27: Implement "Ask AI on Selected Text" Feature

## 8. Polish & Deployment
- [ ] Task 28: Final UI Polish & Responsive Testing
- [ ] Task 29: Deploy Backend (Render/Railway)
- [ ] Task 30: Deploy Frontend (GitHub Pages/Vercel)
```

Codex MUST follow tasks.md as the **only execution roadmap**.

──────────────────────────────────────────────────────────────

# 8. HISTORY SYSTEM (LOG EVERYTHING RULE)

**CRITICAL UPDATE:**
Codex MUST generate a history file for **EVERY** user interaction, prompt, or message.

- **If it's a Task**: Save in `history/prompts/<category>/task-<number>-<name>.md`.
- **If it's a General Request**: Save in `history/prompts/misc/<timestamp>-<topic>.md`.

Each file MUST contain:

- Metadata (Date, Type: Task/General)
- Prompt Used
- Work Performed
- Outcome

──────────────────────────────────────────────────────────────

# 9. GITHUB COMMIT SYSTEM (LOG EVERYTHING RULE)

**CRITICAL UPDATE:**
Codex MUST generate a GitHub commit file for **EVERY** user interaction.

- **If it's a Task**: `github-commit/task-<number>-<name>.commit.md`
- **If it's a General Request**: `github-commit/misc-<timestamp>-<topic>.commit.md`

Commit messages for general requests should use `chore:` or `docs:` prefixes.

### Commit template MUST include:

- Commit title
- Summary
- Task number
- Files changed
- Why change was needed
- Ready-to-copy GitHub commit message
- Ready-to-copy description

──────────────────────────────────────────────────────────────

# 10. USER INTERACTION RULES

Codex MUST ask the user if:

- information is missing
- design choice unclear
- credentials required

## 10.1 CRITICAL INSTRUCTION LOOP

**Codex MUST read `instructions.md` after EVERY task.**
This ensures that any dynamic user rules or workflow adjustments are immediately applied. Failure to check `instructions.md` is a violation of the protocol.

User executes tasks via:

```
Proceed with Task <number>
```

──────────────────────────────────────────────────────────────

# 11. EXECUTION GOALS

Codex MUST deliver:

✔ Full Docusaurus Website
✔ Infima UI
✔ All chapters
✔ FastAPI backend
✔ RAG search engine
✔ Chatbot
✔ Complete tasks.md
✔ Full history system
✔ Full GitHub commit system

──────────────────────────────────────────────────────────────

# END OF INFO.md
