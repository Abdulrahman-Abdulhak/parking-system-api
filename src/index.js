import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT ?? 3000;

// Middleware
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
