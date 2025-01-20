import { Router } from "express";
import { initPayment, createPayment } from "../controllers/index.js";

const router = Router();

router.post("/init", initPayment);
router.post("/pay", createPayment);

export default router;
