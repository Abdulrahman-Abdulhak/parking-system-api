const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
