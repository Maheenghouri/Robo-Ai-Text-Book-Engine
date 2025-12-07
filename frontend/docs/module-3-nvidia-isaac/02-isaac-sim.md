---
title: NVIDIA Isaac Sim
sidebar_position: 3
---

# NVIDIA Isaac Sim

## Omniverse Powered
Isaac Sim is built on **NVIDIA Omniverse**, a platform for creating metaverse applications. It uses **USD (Universal Scene Description)** as its standard file format, allowing collaboration between different 3D tools (Maya, Blender, Unreal).

## Why Isaac Sim?
1.  **RTX Rendering**: Real-time ray tracing provides physically accurate sensor data.
2.  **GPU Physics**: PhysX 5 handles rigid bodies, soft bodies (cloth/flesh), and fluids on the GPU, allowing thousands of parallel environments.
3.  **Replicator**: A tool for generating synthetic training data with automatic ground-truth annotation.

## Setting Up a Scene
```python
# Pseudo-code for loading a robot in Isaac Sim
from omni.isaac.core.robots import Robot

def setup_scene():
    robot = Robot(prim_path="/World/Franka", name="franka_robot")
    robot.initialize()
    print("Robot loaded successfully into Omniverse.")
```
