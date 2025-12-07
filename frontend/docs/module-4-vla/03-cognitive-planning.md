---
title: Cognitive Planning
sidebar_position: 4
---

# Cognitive Planning with LLMs

## From "High Level" to "Low Level"
Humans give instructions at a high level ("Clean the kitchen"). Robots execute instructions at a low level ("Move arm to x,y,z").
**Cognitive Planning** is the translation layer.

## Chain of Thought (CoT)
We prompt the LLM to break down complex tasks into atomic primitives.

**User**: "Clean the kitchen."

**LLM Plan**:
1.  `Scan_Environment()` -> Found: Apple, Trash Can.
2.  `Identify_Object(Apple)` -> Food.
3.  `Identify_Object(Trash Can)` -> Waste Receptacle.
4.  `Pick(Apple)`
5.  `Move_To(Trash Can)`
6.  `Drop()`

## PDDL (Planning Domain Definition Language)
Classically, we used PDDL. Now, LLMs can generate PDDL code or Python scripts dynamically to solve novel problems they haven't been explicitly programmed for.
