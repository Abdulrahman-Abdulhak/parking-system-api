import express from "express";
import {
  confirmReservation,
  reserveSpot,
  setSessionKey,
} from "../controllers/index.js";

const router = express.Router();

router.post("/setSessionKey", setSessionKey);
router.post("/reserve", reserveSpot);
router.post("/confirm", confirmReservation);

export default router;
