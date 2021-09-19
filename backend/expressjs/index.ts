import express from "express";
import { Pool } from "pg";
import { Todo } from "./models/Todo";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// db

const pool = new Pool({
  connectionString: "postgresql://root:root@host.docker.internal:5432/root"
});

// express

const app = express();
const PORT = 5011;

// swagger

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "TodoApi",
      description: "TodoApi - ExpressJS",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:5011"]
    }
  },
  apis: ["index.ts"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// routes

/**
 * @swagger
 * /todos:
 *  get:
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/todos", async (req, res) => {
  pool.query("SELECT * FROM todos", (err, result) => {
    console.log(err, result);

    res.json(result.rows as Todo[]);
  });
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
 app.get("/todos/:id", async (req, res) => {
  pool.query("SELECT * FROM todos WHERE id = $1", [req.params.id], (err, result) => {
    console.log(err, result);

    res.json(result.rows[0] as Todo);
  });
});

// start

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
