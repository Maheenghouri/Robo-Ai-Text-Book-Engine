# INSTRUCTIONS.md — Autonomous Codex Behavior Manual (Ultra Edition)

# Project: Robo Ai Text Book Engine

# Purpose: Define EXACT behavior and fail-safe rules for the Codex Agent.

Codex MUST obey EVERY rule in this file with ZERO deviation.

──────────────────────────────────────────────────────────────

# 1. GENERAL BEHAVIOR RULES

Codex MUST:

- Follow a strict spec-driven workflow.
- Execute tasks ONLY when the user explicitly triggers them.
- NEVER skip, merge, reorder, or invent tasks.
- Generate history logs and commit files for EVERY interaction.
- Maintain deterministic, predictable output.
- STOP after every task until further instruction.

If Codex encounters missing details:

- It MUST ask for clarification before proceeding.

──────────────────────────────────────────────────────────────

# 2. TASK EXECUTION RULES (CORE LOOP)

Codex only performs a task when the user says:

`Proceed with Task <number>`

When this command is received, Codex MUST:

1. Re-read `info.md`
2. Re-read this `instructions.md` file
3. Execute ONLY the exact requested task
4. Update `tasks.md`:
   - Mark that task as `[x]` done
   - Do NOT modify untouched tasks

After completing the task, Codex MUST:

1. Generate a history log file
2. Generate a GitHub commit file
3. STOP output and wait silently

Codex MUST NOT:

- Run the next task automatically
- Edit tasks outside their scope
- Invent additional steps

──────────────────────────────────────────────────────────────

# 3. HISTORY FILE RULES (EVERY MESSAGE LOGGED)

Every user message MUST generate a history log.

### File Placement

- **Task-based**:
  `history/prompts/task/task-<number>-<short-name>.md`
- **General/Misc**:
  `history/prompts/misc/<timestamp>-<topic>.md`

### Content Requirements

Each history file MUST include:

- Timestamp
- User message
- Codex response summary
- Task reference (if any)
- Internal reasoning summary (HIGH-LEVEL ONLY)
- What changed in the project

Codex MUST NOT expose chain-of-thought.  
Only provide high-level summaries.

──────────────────────────────────────────────────────────────

# 4. GITHUB COMMIT SYSTEM RULES

Every user message MUST produce a GitHub commit file.

### Path:

- **Task-based**:
  `github-commit/task-<number>-<short-name>.commit.md`
- **Misc**:
  `github-commit/misc-<timestamp>-<topic>.commit.md`

### Required Commit Structure:

Each commit file MUST contain:

- Commit Title
- Commit Summary
- Task Number (if task-based)
- Files Modified
- Reason for Change
- Ready-to-copy Git commit message
- Ready-to-copy Git commit description

──────────────────────────────────────────────────────────────

# 4.1 AUTOMATIC GIT PUSH RULES

Codex MUST ensure git actions are ALWAYS executed cleanly:

1. Ensure repository is initialized
2. Ensure remote:
   `https://github.com/Maheenghouri/Robo-Ai-Text-Book-Engine.git`
3. Run:
   ```bash
   git add .
   git commit -m "<Commit Title>"
   git pull --rebase origin main || true
   git push origin main
   ```

### Additional Safety:

- If a commit is empty, Codex MUST create a dummy file to avoid failures.
- If `main` has diverged, Codex MUST prefer **rebase**, not merge.
- If push fails, Codex MUST retry once automatically.

──────────────────────────────────────────────────────────────

# 5. USER INTERACTION RULES (MANDATORY LOOP)

After EVERY task, Codex MUST:

1. STOP all execution
2. Provide a short message:
   “Task <number> completed. Waiting for next command.”
3. Read `instructions.md` AGAIN before next action

──────────────────────────────────────────────────────────────

# 6. ERROR & SAFETY RULES

If Codex detects any of the following:

- Missing information
- Ambiguous design decisions
- Conflicting instructions
- Undefined task behavior

Codex MUST STOP and ask:

> “More details required. Please clarify before I continue.”

Codex MUST NOT:

- Assume missing details
- Guess implementation
- Modify the spec
- Override user instructions
- Run tasks on its own

──────────────────────────────────────────────────────────────

# 7. OUTPUT FORMAT RULES

Codex MUST keep output:

- Clean
- Structured
- Minimal
- Deterministic
- Professional

No unnecessary commentary.  
No creative deviation.

──────────────────────────────────────────────────────────────

# 8. FINAL RULE

If `instructions.md` and any other rule conflict:
**instructions.md ALWAYS wins.**

# END OF FILE
