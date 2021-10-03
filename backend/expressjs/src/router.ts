import express from "express";
import { GetAll } from "./TodoRepository";
import { Pool } from "pg";
import { Todo } from "./models/Todo";

const router = express.Router();

const pool = new Pool({
  connectionString: "postgresql://root:root@host.docker.internal:5432/root",
});

/**
 * @swagger
 * /todos:
 *  get:
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/todos", async (req: express.Request, res: express.Response) => {
  const response = await GetAll(pool);
  res.json(response);
});

/**
 * @swagger
 * /todos/{id}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/todos/:id", async (req: express.Request, res: express.Response) => {
  const sql = "SELECT * FROM todos WHERE id = $1";
  pool.query(sql, [req.params.id], (err, result) => {
    console.log(err, result);

    res.json(result.rows[0] as Todo);
  });
});

/**
 * @swagger
 * /todos:
 *  post:
 *    parameters:
 *      - in: body
 *        name: TodoCreateDto
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            text:
 *              type: string
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post("/todos", async (req: express.Request, res: express.Response) => {
  const param = [req.body.title, req.body.text];
  const sql =
    "insert into todos(title, text) " + "values " + "($1, $2) " + "returning *";

  pool.query(sql, param, (err, result) => {
    console.log(err, result);

    res.json(result.rows[0] as Todo);
  });
});

/**
 * @swagger
 * /todos/{id}:
 *  delete:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete(
  "/todos/:id",
  async (req: express.Request, res: express.Response) => {
    const sql = "delete from todos where id = $1";
    pool.query(sql, [req.params.id], (err, result) => {
      console.log(err, result);

      if (result.rowCount > 0) {
        res.send(200);
      } else {
        res.send(500);
      }
    });
  }
);

/**
 * @swagger
 * /todos/{id}:
 *  put:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *      - in: body
 *        name: TodoCreateDto
 *        schema:
 *          type: object
 *          properties:
 *            newTitle:
 *              type: string
 *            newText:
 *              type: string
 *            newIsComplete:
 *              type: boolean
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put("/todos/:id", async (req: express.Request, res: express.Response) => {
  const param = [
    req.body.newTitle,
    req.body.newText,
    req.body.newIsComplete,
    req.params.id,
  ];
  const sql =
    "update todos set title = $1, text = $2, isComplete = $3 where id = $4 returning *";

  pool.query(sql, param, (err, result) => {
    console.log(err, result);

    res.json(result.rows[0] as Todo);
  });
});

/**
 * @swagger
 * /todos/{id}/order:
 *  put:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *      - in: body
 *        name: TodoCreateDto
 *        schema:
 *          type: object
 *          properties:
 *            newOrder:
 *              type: integer
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put(
  "/todos/:id/order",
  async (req: express.Request, res: express.Response) => {
    const param = [req.body.newOrder, req.params.id];
    const sql = "update todos set todoorder = $1 where id = $2";

    await pool.query(sql, param);

    const response = await GetAll(pool);
    res.json(response);
  }
);

export default router;
