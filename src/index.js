import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";
import reservationRoutes from "./routes/Reservation.js"; 

const app = express();
const port = process.env.SERVER_PORT ?? 3000;

// Middleware
app.use(bodyParser.json());

// إضافة مسارات المستخدمين
app.use("/api/users", userRoutes);


app.use("/api/reservations", reservationRoutes); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});