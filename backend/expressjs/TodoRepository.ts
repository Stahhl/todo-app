import { Pool } from "pg";
import { Todo } from "./models/Todo";

export async function GetAll(pool: Pool): Promise<Todo[]> {
  const result = await pool.query("select * from todos");

  return result.rows as Todo[];
}
