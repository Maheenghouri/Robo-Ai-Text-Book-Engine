from pydantic import BaseModel
from typing import Optional

class QueryRequest(BaseModel):
    query: str
    stream: bool = True

class QuerySelectedRequest(BaseModel):
    query: str
    selected_text: str
    stream: bool = True
