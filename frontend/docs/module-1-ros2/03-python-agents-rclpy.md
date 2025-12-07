---
title: Bridging Python Agents (rclpy)
sidebar_position: 4
---

# Bridging Python Agents to ROS 2

## rclpy: The Python Client Library
`rclpy` is the interface that allows Python code to talk to the ROS 2 core. It is essential for integrating modern AI (which is mostly Python-based) with robotics hardware.

## Creating a Simple Publisher
Here is a minimal example of a Python agent publishing messages:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## AI Integration
We use `rclpy` to wrap our AI Models (e.g., LLMs, Vision Models) within a ROS Node, allowing the AI to "speak" directly to the robot's motors.
