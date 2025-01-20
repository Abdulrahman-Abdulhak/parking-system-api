import { authControllerWrapper } from "../middleware/index.js";
import { createPaymentModel } from "../models/index.js";
import { Asymmetric, getUserID } from "../utils/index.js";

export const initPayment = authControllerWrapper((req, res) => {
  Asymmetric.generateServerKeys(req);
  res.json({ package: { public: Asymmetric.getServerPublicKey() } });
});

export const createPayment = authControllerWrapper(async (req, res) => {
  const { payment, signature } = req.body;

  const decryptedPayment = Asymmetric.decryptData(
    Asymmetric.getServerPrivateKey(req),
    payment
  );

  if (!verifySignature(req, decryptedPayment, signature)) {
    throw new CustomApiError(
      "Signature is incorrect or data sent is corrupted",
      400
    );
  } else {
    await addActivity(req, "pay", signature);
  }

  const { amount, transactionId } = JSON.parse(decryptedPayment);

  const paymentDetails = await createPaymentModel().create({
    userId: getUserID(req),
    amount,
    status: "confirmed", // TODO: change when using real payment system
    paymentDate: new Date(),
    transactionId,
  });
  res.status(200).json({ message: "Payment successful", paymentDetails });
});
