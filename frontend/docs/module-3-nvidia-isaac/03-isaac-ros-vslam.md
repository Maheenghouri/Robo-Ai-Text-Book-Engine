---
title: Isaac ROS & VSLAM
sidebar_position: 4
---

# Isaac ROS: Hardware Acceleration

## VSLAM (Visual Simultaneous Localization and Mapping)
To move, a robot must know where it is (`Localization`) and what the world looks like (`Mapping`) at the same time.
-   **Visual Odometry**: Tracking features (corners, edges) between frames to estimate movement.
-   **Loop Closure**: Recognizing a place visited before to correct accumulated drift errors.

## Hardware Acceleration (GEMs)
Running VSLAM on a CPU is slow. **Isaac ROS** provides "GEMs"—highly optimized algorithms that run on NVIDIA GPUs (Jetson Orin).

### Key GEMs:
-   `isaac_ros_visual_slam`: GPU-accelerated localization.
-   `isaac_ros_apriltag`: Fast detection of fiducial markers.
-   `isaac_ros_nvblox`: real-time 3D reconstruction using signed distance fields (SDF) on GPU.

## The Jetson Edge
These algorithms are designed to run on the **Jetson Orin**, putting server-class AI performance directly into the robot's head.
