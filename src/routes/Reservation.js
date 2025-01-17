import { Router } from "express";
import {
  confirmReservation,
  reserveSpot,
  setSessionKey,
} from "../controllers/index.js";

const router = Router();

router.post("/setSessionKey", setSessionKey);
router.post("/reserve", reserveSpot);
router.post("/confirm", confirmReservation);

export default router;
