import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";

import { ReservationRouter, UserRouter } from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/index.js";
import init from "./init.js";

init();

const app = express();
const port = process.env.SERVER_PORT ?? 3000;

//* Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: true,
      maxAge: 3_600_000, //? 1 Hour
      path: "/api",
      httpOnly: true,
    },
  })
);

//* Routes

/**
 * This represents the path with the application server. (useful for scalable applications)
 */
const baseServerPath = `/api/${process.env.version}`;

app.use(`${baseServerPath}/users`, UserRouter);
app.use(`${baseServerPath}/reservations`, ReservationRouter);

if (process.env.DEV) {
  app.get(`${baseServerPath}/random`, (req, res) => {
    console.log(req.session);
    res.status(200).json({ value: parseInt(Math.random() * 1_000_000_000) });
  });
}

app.use(notFound);
app.use(errorHandler);

const protocol = "http";
const host = process.env.SERVER_HOST;
const baseURL = `${protocol}://${host}:${port}${baseServerPath}`;
app.listen(port, () => {
  console.log(`Server running at ${baseURL}`);
});
