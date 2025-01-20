import { Router } from "express";
import { reserveSpot } from "../controllers/index.js";

const router = Router();

router.post("/reserve", reserveSpot);

export default router;
