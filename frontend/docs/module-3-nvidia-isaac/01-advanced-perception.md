---
title: Advanced Perception & Training
sidebar_position: 2
---

# The AI-Robot Brain: Perception

## Beyond Simple Sensors
Classical robotics uses sensors to measure *values* (distance = 2m). AI robotics uses perception to understand *meaning* (there is a chair 2m away).

## Computer Vision Pipeline
1.  **Input**: RGB Images from cameras.
2.  **Backbone**: A CNN (ResNet, EfficientNet) or Transformer (ViT) that extracts features.
3.  **Head**: Task-specific output layers.
    -   *Object Detection* (YOLO): "What is where?"
    -   *Semantic Segmentation*: "What is every pixel?"
    -   *Pose Estimation*: "How is the object oriented?"

## Synthetic Data Training
Training these models requires massive data. Instead of taking 10,000 photos of a screwdriver, we generate them in **Isaac Sim**.
-   **Domain Randomization**: We vary lighting, textures, and camera angles in the simulator.
-   **Transfer Learning**: A model trained on randomized synthetic data generalizes surprisingly well to the real world (Sim-to-Real).
