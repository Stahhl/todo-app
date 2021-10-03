import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import router from "./router";

// express

const app = express();
const PORT = 5011;
app.use(express.json());

// swagger

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "TodoApi",
      description: "TodoApi - ExpressJS",
      contact: {
        name: "Amazing Developer",
      },
      servers: ["http://localhost:5011"],
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// routes

app.use("/", router);

// start

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
