import express from "express";
import { Create, Delete, GetAll, GetById, Update, UpdateOrder } from "./TodoRepository";
import { Pool } from "pg";

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
  res.status(200).json(response);
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
router.get(
  "/todos/:id",
  async (req: express.Request, res: express.Response) => {
    const response = await GetById(pool, req.params.id);
    res.status(200).json(response);
  }
);

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
  const response = await Create(pool, req.body.title, req.body.text);
  res.status(201).json(response);
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
    const status = await Delete(pool, req.params.id);
    res.sendStatus(status);
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
router.put(
  "/todos/:id",
  async (req: express.Request, res: express.Response) => {
    const response = await Update(
      pool,
      req.params.id,
      req.body.newTitle,
      req.body.newText,
      req.body.newIsComplete
    );
    res.status(200).json(response);
  }
);

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
    const response = await UpdateOrder(pool, req.params.id, req.body.newOrder);
    res.status(200).json(response);
  }
);

export default router;
