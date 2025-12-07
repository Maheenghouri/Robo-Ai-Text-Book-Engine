---
title: Understanding URDF
sidebar_position: 5
---

# Understanding URDF for Humanoids

## Unified Robot Description Format
URDF is an XML format used to describe the physical structure of a robot. It defines the "Body" that the "Brain" controls.

## Key Components
1. **Links**: The rigid body parts (e.g., forearm, bicep, shin).
2. **Joints**: The movable connections (e.g., elbow hinge, shoulder ball-socket).
    - *Revolute*: Rotates around an axis (limited range).
    - *Continuous*: Rotates indefinitely (wheels).
    - *Prismatic*: Slides along an axis.

## Example URDF Snippet
```xml
<robot name="simple_arm">
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.6" radius="0.2"/>
      </geometry>
    </visual>
  </link>
  
  <joint name="elbow_joint" type="revolute">
    <parent link="base_link"/>
    <child link="forearm"/>
    <origin xyz="0 0 0.6" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" effort="10" velocity="1"/>
  </joint>
</robot>
```

## For Humanoids
Humanoid URDFs are complex trees with high degrees of freedom (DoF). Simulating them requires precise mass and inertia definitions in the URDF to prevent "exploding simulations".
