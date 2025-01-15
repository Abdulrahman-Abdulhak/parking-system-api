import { CustomApiError, NotFoundError } from "../errors/index.js";
import { asyncWrapper } from "../middleware/index.js";

import { createReservationModel, createUserModel } from "../models/index.js";
import { encrypt, decrypt, setKey } from "../utils/index.js";

export const setSessionKey = asyncWrapper((req, res) => {
  const { sessionKey } = req.body;
  if (!sessionKey) {
    throw new CustomApiError("Session key is required");
  }

  setKey(sessionKey);
  res.json({ message: "Session key set successfully" });
});

export const reserveSpot = asyncWrapper(async (req, res) => {
  const { spotNumber, userId } = req.body;

  const user = await createUserModel().findByPk(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const reservationData = JSON.stringify({
    spotNumber,
    reservedAt: new Date().toISOString(),
  });
  const encryptedData = encrypt(reservationData);

  await createReservationModel().create({
    spotNumber,
    reservedAt: new Date(),
    userId,
  });

  res.status(201).json({
    message: "Reservation confirmed",
    data: encryptedData,
  });
});

export const confirmReservation = asyncWrapper((req, res) => {
  const { encryptedData, iv } = req.body;

  const decryptedData = decrypt({ iv, encryptedData });
  const { spotNumber, reservedAt } = JSON.parse(decryptedData);

  res.status(200).json({
    message: "Data received and decrypted",
    spotNumber,
    reservedAt,
  });
});
