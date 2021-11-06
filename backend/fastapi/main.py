import uvicorn
from fastapi import FastAPI

app = FastAPI()

@app.get("/todos")
def index():
    return {"message": "Hello World"}

@app.get("/todos/{id}")
def index(id: str):
    return {"message": "Hello World"}

@app.post("/todos")
def index():
    return {"message": "Hello World"}

@app.delete("/todos/{id}")
def index(id: str):
    return {"message": "Hello World"}

@app.put("/todos/{id}")
def index(id: str):
    return {"message": "Hello World"}

@app.put("/todos/{id}/order")
def index(id: str):
    return {"message": "Hello World"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)