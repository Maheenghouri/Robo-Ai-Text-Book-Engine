# GitHub Commit - Task 11

**Date**: 2025-12-08 00:33:00
**Type**: Task Execution

## Commit Title
config: setup sidebar structure for textbook modules

## Summary
Refactor documentation structure to support the 4 core textbook modules. Removed default Docusaurus tutorial files. Configured `sidebars.ts` to define distinct categories for ROS 2, Digital Twin, NVIDIA Isaac, and VLA. Created placeholder `intro.md` files for each module to ensure proper build.

## Task Number
Task 11

## Files Modified
- `frontend/sidebars.ts` (Updated structure)
- `frontend/docs/module-1-ros2/intro.md` (New)
- `frontend/docs/module-2-digital-twin/intro.md` (New)
- `frontend/docs/module-3-nvidia-isaac/intro.md` (New)
- `frontend/docs/module-4-vla/intro.md` (New)
- `frontend/docs/*` (Deleted legacy files)
- `tasks.md` (Updated status)

## Why change was needed
To enforce the specific "Physical AI" curriculum structure (`The Robotic Nervous System`, `The Digital Twin`, etc.) in the project's documentation system.

## Ready-to-copy GitHub commit message
```bash
git add .
git commit -m "config: setup sidebar structure for textbook modules"
git push origin main
```
