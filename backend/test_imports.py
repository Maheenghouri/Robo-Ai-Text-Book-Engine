import sys
import os

# Ensure root is in path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

print("--- Testing Imports ---")

try:
    print("1. Importing backend.db.qdrant...")
    import backend.db.qdrant
    print("   SUCCESS")
except Exception as e:
    print(f"   FAIL: {e}")

try:
    print("2. Importing backend.rag.embeddings...")
    import backend.rag.embeddings
    print("   SUCCESS")
except Exception as e:
    print(f"   FAIL: {e}")

try:
    print("3. Importing backend.rag.search...")
    import backend.rag.search
    print("   SUCCESS")
except Exception as e:
    print(f"   FAIL: {e}")

try:
    print("4. Importing backend.rag.generation...")
    import backend.rag.generation
    print("   SUCCESS")
except Exception as e:
    print(f"   FAIL: {e}")
