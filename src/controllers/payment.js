import { Payment } from '../models/payment.js';
import { decryptData, getServerPublicKey, setClientKeys } from '../utils/encryption.js';


let clientPublicKey;

export const initPaymentKeys = (req, res) => {
  clientPublicKey = req.body.clientPublicKey; 
  setClientKeys(clientPublicKey);
  const serverPublicKey = getServerPublicKey(); 
  res.json({ serverPublicKey });
};

export const createPayment = async (req, res) => {
  const { encryptedSessionKey, encryptedPaymentData } = req.body;

  
  const sessionKey = decryptData(encryptedSessionKey, serverPrivateKey);

  const paymentData = decryptData(encryptedPaymentData, sessionKey);
  
  const { userId, amount } = JSON.parse(paymentData);

  try {
    await Payment.create({
      userId,
      amount,
      status: 'confirmed',
      paymentDate: new Date(),
    });
    res.json({ message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ message: "Error processing payment", error: error.message });
  }
};