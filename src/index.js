import express from "express";
import bodyParser from "body-parser";

import { ReservationRouter, UserRouter } from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/index.js";
import init from "./init.js";

init();

const app = express();
const port = process.env.SERVER_PORT ?? 3000;

//* Middleware
app.use(bodyParser.json());

//* Routes

/**
 * This represents the path with the application server. (useful for scalable applications)
 */
const baseServerPath = `/api/${process.env.version}`;

app.use(`${baseServerPath}/users`, UserRouter);
app.use(`${baseServerPath}/reservations`, ReservationRouter);

if (process.env.DEV) {
  app.get(`${baseServerPath}/random`, (req, res) => {
    res.status(200).json({ value: parseInt(Math.random() * 1_000_000_000) });
  });
}

app.use(notFound);
app.use(errorHandler);

const protocol = "http";
const host = process.env.SERVER_HOST;
const baseURL = `${protocol}://${host}:${port}`;
app.listen(port, () => {
  console.log(`Server running at ${baseURL}`);
});
