---
title: Voice-to-Action (Whisper)
sidebar_position: 3
---

# Voice-to-Action with OpenAI Whisper

## The Semantic Hearing System
To interact naturally with humans, a humanoid must have ears. We use **OpenAI Whisper**, a robust Automatic Speech Recognition (ASR) model.

## The Pipeline
1.  **Audio Capture**: Microphone array captures the user's voice.
2.  **Transcription**: Whisper converts audio bytes to text strings.
    -   *Example*: "Robot, please bring me a soda."
3.  **Intent Classification**: An LLM (like GPT-4o) analyzes the text.
    -   *Intent*: `FETCH_OBJECT`
    -   *Target*: `SODA`
4.  **Action Execution**: The Intent triggers a ROS 2 Action Server.

## Code Snippet (Concept)
```python
import whisper

model = whisper.load_model("base")
result = model.transcribe("audio.mp3")
print(result["text"])
# Output: "Robot, please bring me a soda."
```
