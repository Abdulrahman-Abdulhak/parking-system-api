import { CustomApiError } from "../errors/index.js";
import { authControllerWrapper } from "../middleware/index.js";
import { createReservationModel } from "../models/index.js";
import {
  Symmetric,
  addActivity,
  getSessionKey,
  getSignature,
  getUserID,
  verifySignature,
} from "../utils/index.js";

export const reserveSpot = authControllerWrapper(async (req, res) => {
  const { spotNumber, time, signature } = req.body;

  const decipheredSpotNumber = Symmetric.decipher(
    getSessionKey(req),
    spotNumber
  );
  const decipheredTime = Symmetric.decipher(getSessionKey(req), time);

  const data = {
    spotNumber: decipheredSpotNumber,
    time: decipheredTime,
  };

  if (!verifySignature(req, data, signature)) {
    throw new CustomApiError(
      "Signature is incorrect or data sent is corrupted",
      400
    );
  } else {
    await addActivity(req, "reserve", signature);
  }

  await createReservationModel().create({
    ...data,
    userId: getUserID(req),
  });

  res.status(201).json({
    message: "Reservation confirmed",
    data: Symmetric.cipherText(getSessionKey(req), JSON.stringify(data)),
    signature: getSignature(req, data),
  });
});
