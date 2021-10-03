import { Pool } from "pg";
import { Todo } from "./models/Todo";

export async function GetAll(pool: Pool): Promise<Todo[]> {
  const sql = "select * from todos";
  const result = await pool.query(sql);

  return result.rows as Todo[];
}

export async function GetById(pool: Pool, id: string): Promise<Todo> {
  const sql = "SELECT * FROM todos WHERE id = $1";
  const result = await pool.query(sql, [id]);

  return result.rows[0] as Todo;
}

export async function Create(
  pool: Pool,
  title: string,
  text: string
): Promise<Todo> {
  const sql = "insert into todos(title, text) values ($1, $2) returning * ";
  const result = await pool.query(sql, [title, text]);

  return result.rows[0] as Todo;
}

export async function Delete(pool: Pool, id: string): Promise<number> {
  const sql = "delete from todos where id = $1";
  const result = await pool.query(sql, [id]);

  if (result.rowCount > 0) {
    return 200;
  } else {
    return 500;
  }
}

export async function Update(
  pool: Pool,
  id: string,
  newTitle: string,
  newText: string,
  newIsComplete: boolean
): Promise<Todo> {
  const sql =
    "update todos set title = $1, text = $2, isComplete = $3 where id = $4 returning *";
  const result = await pool.query(sql, [newTitle, newText, newIsComplete, id]);

  return result.rows[0] as Todo;
}

export async function UpdateOrder(
  pool: Pool,
  id: string,
  newOrder: number
): Promise<Todo[]> {
  const sql = "update todos set todoorder = $1 where id = $2";
  await pool.query(sql, [newOrder, id]);

  return await GetAll(pool);
}
