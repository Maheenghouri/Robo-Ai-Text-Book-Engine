---
title: Unity for HRI
sidebar_position: 4
---

# High-Fidelity Rendering in Unity

## Why Unity for Robotics?
While Gazebo is great for physics, it lacks visual fidelity. **Unity**, a game engine, provides:
-   **Photorealism**: Real-time ray tracing, advanced materials.
-   **VR/AR support**: Teleoperation using VR headsets.
-   **Human Interaction**: Simulating realistic crowds and human behaviors.

## ROS-TCP Connector
To connect Unity (C#) with ROS 2 (Python/C++), we use the **ROS-TCP Connector**. It serializes ROS messages to JSON/BSON and sends them over a TCP socket.

## Simulating the "V" in VLA
Vision-Language-Action models need massive amounts of visual training data. Unity can generate:
-   **Synthetic Datasets**: Automatically annotated images (e.g., bounding boxes around "cups").
-   **Domain Randomization**: Changing colors and lighting randomly to make the AI robust.

> Unity effectively gives our robot "eyes" that are as good as our own.
