---
title: "Gazebo: Physics & Collisions"
sidebar_position: 3
---

# Simulating Physics in Gazebo

## The Physics Engine
Gazebo uses physics engines like **ODE (Open Dynamics Engine)** and **Bullet** to calculate forces. It solves differential equations to update the position and velocity of every link in your robot.

## Gravity and Contacts
-   **Gravity**: By default, $9.81 m/s^2$ downwards.
-   **Contacts**: When two collision meshes intersect, the engine calculates a repulsion force to separate them.
    -   *Hard Contact*: Instant separation (bouncing).
    -   *Soft Contact*: Slight compliance (spongy).

## The SDF Format
While ROS uses URDF, Gazebo prefers **SDF (Simulation Description Format)**. SDF allows defining:
-   **World properties**: Sun light, wind, magnetic field.
-   **Plugins**: Scripts that run inside the simulator (e.g., a differential drive controller).

```xml
<world name="default">
  <include>
    <uri>model://ground_plane</uri>
  </include>
  <include>
    <uri>model://sun</uri>
  </include>
</world>
```
