import { authControllerWrapper } from "../middleware/index.js";
import { createReservationModel } from "../models/index.js";
import {
  decrypt,
  Symmetric,
  getSessionKey,
  getUserID,
} from "../utils/index.js";

export const reserveSpot = authControllerWrapper(async (req, res) => {
  const { spotNumber, time } = req.body;

  const decipheredSpotNumber = Symmetric.decipher(
    getSessionKey(req),
    spotNumber
  );
  const decipheredTime = Symmetric.decipher(getSessionKey(req), time);

  const reservationData = {
    spotNumber: decipheredSpotNumber,
    reservedAt: decipheredTime,
  };
  // const encryptedData = encrypt(reservationData);

  await createReservationModel().create({
    spotNumber: decipheredSpotNumber,
    reservedAt: decipheredTime,
    userId: getUserID(req),
  });

  res.status(201).json({
    message: "Reservation confirmed",
    data: encryptedData,
  });
});
