// import { controllerWrapper } from "../middleware/wrapper.js";
// import { createPaymentModel } from "../models/index.js";
// import {
//   decryptData,
//   getServerPublicKey,
//   setClientKeys,
// } from "../utils/index.js";

// let clientPublicKey;

// export const initPaymentKeys = controllerWrapper((req, res) => {
//   clientPublicKey = req.body.clientPublicKey;
//   setClientKeys(clientPublicKey);

//   const serverPublicKey = getServerPublicKey();
//   res.status(200).json({ serverPublicKey });
// });

// export const createPayment = controllerWrapper(async (req, res) => {
//   const { encryptedSessionKey, encryptedPaymentData } = req.body;

//   const sessionKey = decryptData(encryptedSessionKey, serverPrivateKey);
//   const paymentData = decryptData(encryptedPaymentData, sessionKey);

//   const { userId, amount } = JSON.parse(paymentData);

//   await createPaymentModel().create({
//     userId,
//     amount,
//     status: "confirmed",
//     paymentDate: new Date(),
//   });

//   res.status(200).json({ message: "Payment successful" });
// });
