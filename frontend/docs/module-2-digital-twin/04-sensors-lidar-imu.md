---
title: Simulating Sensors
sidebar_position: 5
---

# Simulating Sensors: LiDAR, Cameras, IMU

## The Robot's Senses
To navigate, a Digital Twin must have virtual sensors that mimic real hardware defects (noise).

## 1. LiDAR (Light Detection and Ranging)
-   **Function**: Shoots lasers to measure distance.
-   **Simulation**: Ray-casting in 360 degrees.
-   **Output**: `sensor_msgs/LaserScan` or `PointCloud2`.

## 2. Depth Cameras (RGB-D)
-   **Function**: Returns color (RGB) and distance (Depth) for every pixel.
-   **Simulation**: Renders the scene from the camera's perspective and uses the Z-buffer for depth.

## 3. IMU (Inertial Measurement Unit)
-   **Function**: Measures acceleration (Accelerometer) and rotation rate (Gyroscope).
-   **Simulation**: Reads the exact acceleration from the physics engine and adds Gaussian noise to simulate real-world sensor drift.

## Visualizing in Rviz
All these simulated sensors can be visualized in **RViz** (ROS Visualization) alongside the actual robot state.
