import uvicorn
import databases
from fastapi import FastAPI, HTTPException
from models import TodoCreateDto, TodoUpdateDto, TodoOrderUpdateDto

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
async def Create(dto: TodoCreateDto):
    await db.connect()
    sql = "INSERT INTO todos (title, text) VALUES (:title, :text) returning *"
    param = {"title": dto.title, "text": dto.text}
    result = await db.fetch_all(sql, param)
    await db.disconnect()

    return result


@app.delete("/todos/{id}")
async def Delete(id: str):
    await db.connect()
    sql = "DELETE FROM todos WHERE id = :id RETURNING *"
    param = {"id": id}
    result = await db.fetch_val(sql, param)
    await db.disconnect()

    if(result is None):
        raise HTTPException(status_code=404, detail="Not found")
    return


@app.put("/todos/{id}")
async def Update(id: str, dto: TodoUpdateDto):
    await db.connect()
    sql = "UPDATE todos SET title = :title, text = :text, isComplete = :isComplete WHERE id = :id RETURNING *"
    param = {"id": id, "title": dto.title, "text": dto.text, "isComplete": dto.isComplete}
    result = await db.fetch_all(sql, param)
    await db.disconnect()

    return result


@app.put("/todos/{id}/order")
async def UpdateOrder(id: str, dto: TodoOrderUpdateDto):
    await db.connect()
    sql = "UPDATE todos SET todoOrder = :newOrder WHERE id = :id RETURNING *"
    param = {"id": id, "newOrder": dto.newOrder}
    result = await db.fetch_all(sql, param)
    await db.disconnect()

    return result


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
