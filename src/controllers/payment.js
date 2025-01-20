import { authControllerWrapper } from "../middleware/index.js";
import { createPaymentModel } from "../models/index.js";
import { Asymmetric } from "../utils/index.js";

export const initPayment = authControllerWrapper((req, res) => {
  Asymmetric.generateServerKeys(req);
  res.json({ package: Asymmetric.getServerPublicKey() });
});

export const createPayment = authControllerWrapper(async (req, res) => {
  const { payment } = req.body;

  const decryptedPayment = Asymmetric.decryptData(
    Asymmetric.getServerPrivateKey(req),
    payment
  );

  const { userId, amount, transactionId } = JSON.parse(decryptedPayment);

  const paymentDetails = await createPaymentModel().create({
    userId,
    amount,
    status: "confirmed", // TODO: change when using real payment system
    paymentDate: new Date(),
    transactionId,
  });
  res.status(200).json({ message: "Payment successful", paymentDetails });
});
