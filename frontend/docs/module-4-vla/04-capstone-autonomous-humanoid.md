---
title: "Capstone: Autonomous Humanoid"
sidebar_position: 5
---

# Capstone Project: The Autonomous Humanoid

## The Final Challenge
In this capstone project, you will combine everything you have learned to build the software stack for a simulated Humanoid Robot.

## Architecture
1.  **Body**: A custom URDF imported into Gazebo.
2.  **Nervous System**: ROS 2 nodes for joint control.
3.  **Senses**: Lidar and Cameras streaming to Isaac ROS.
4.  **Brain**: A VLA model (running locally or via API) making high-level decisions.

## Mission
Your robot starts in a randomly generated apartment.
**Objective**: "Find the red ball and put it in the box."

## Success Criteria
-   [ ] Robot explores autonomously (Nav2).
-   [ ] Robot detects the ball (Computer Vision).
-   [ ] Robot plans the grasping motion (MoveIt/Isaac).
-   [ ] Robot executes the task without collision.
