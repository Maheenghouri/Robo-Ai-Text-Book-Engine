---
title: Nav2 & Path Planning
sidebar_position: 5
---

# Nav2: The Navigation Stack

## Moving from A to B
**Nav2** is the standard navigation framework for ROS 2. It handles the difficult task of moving a robot through a cluttered environment without hitting things.

## The Navigation Loop
1.  **Global Planner**: Calculates a high-level path (e.g., Dijkstra or A*) from Start to Goal on a static map.
2.  **Local Planner (Controller)**: Calculates immediate velocity commands (`cmd_vel`) to follow the global path while avoiding dynamic obstacles (people, dogs).
3.  **Recovery Behaviors**: What to do if stuck (e.g., spin around, back up).

## Humanoid Path Planning
Humanoids are unique because they are tall and can step *over* obstacles.
-   **Footstep Planning**: Instead of just strictly following a line, the planner must decide where to place feet.
-   **MPCAL (Model Predictive Control for Aligning Legs)**: Advanced controllers used to maintain balance while walking.

> Nav2 transforms a "brain in a jar" into a mobile agent capable of exploring the world.
