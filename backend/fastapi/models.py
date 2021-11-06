from typing import Optional
from pydantic import BaseModel

class Todo(BaseModel):
    id: str
    title: str
    text: str
    todoOrder: int
    isComplete: bool

class TodoCreateDto(BaseModel):
    title: str
    text: str