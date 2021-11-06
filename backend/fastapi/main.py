import uvicorn
import databases
from fastapi import FastAPI, Depends
# from db import GetDb

db = databases.Database(
    "postgresql://root:root@host.docker.internal:5432/root")
app = FastAPI()


def GetDb():
    return db

@app.get("/todos")
async def GetAll():
    await db.connect()
    sql = "SELECT * FROM todos"
    result = await db.fetch_all(sql)
    await db.disconnect()

    return result


@app.get("/todos/{id}")
async def GetById(id: str):
    await db.connect()
    sql = "SELECT * FROM todos WHERE id = :id"
    param = {"id": id}
    result = await db.fetch_all(sql, param)
    await db.disconnect()

    return result


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
