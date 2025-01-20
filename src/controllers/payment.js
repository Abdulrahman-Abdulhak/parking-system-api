import { Payment } from '../models/payment.js';
import { generateServerKeys, decryptSessionKey, decryptPaymentData } from '../utils/RSA.js';
//import { createPaymentModel } from "../models/index.js";
//import { authControllerWrapper } from "../middleware/index.js";

export const initPaymentKeys = (req, res) => {
    const publicKey = generateServerKeys();
    res.json({ serverPublicKey: publicKey });
};

export const createPayment = async (req, res) => {
    const { encryptedSessionKey, encryptedPaymentData } = req.body;

    const sessionKey = decryptSessionKey(encryptedSessionKey);

    const paymentData = decryptPaymentData(encryptedPaymentData, sessionKey);

    const { userId, amount, transactionId } = JSON.parse(paymentData);

    try {
        const payment = await Payment.create({
            userId,
            amount,
            status: 'confirmed',    // هون شوف شو بدك تحطها 
            paymentDate: new Date(),
            transactionId,
        });
        res.json({ message: "Payment successful", payment });
    } catch (error) {
        res.status(500).json({ message: "Error processing payment", error: error.message });
    }
};