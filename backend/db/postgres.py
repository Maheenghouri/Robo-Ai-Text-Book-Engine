import os
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    """
    Returns a raw psycopg connection to the Postgres DB.
    Using 'dict_row' factory to access columns by name.
    """
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL is not set in .env")
        
    conn = psycopg.connect(DATABASE_URL, row_factory=dict_row)
    return conn

def init_db():
    """
    Initializes the database usage tables if they don't exist.
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Create Users Table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        full_name VARCHAR(255),
                        background VARCHAR(50),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                """)
                # Create Chat History Table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS chat_history (
                        id SERIAL PRIMARY KEY,
                        user_id INTEGER REFERENCES users(id),
                        message TEXT NOT NULL,
                        sender VARCHAR(50) NOT NULL, -- 'user' or 'ai'
                        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                """)
                conn.commit()
                print("Postgres tables initialized.")
    except Exception as e:
        print(f"DB Init Error: {e}")

if __name__ == "__main__":
    init_db()
