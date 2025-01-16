import express from 'express';
import { initPaymentKeys, createPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/init', initPaymentKeys);

router.post('/pay', createPayment);

export default router;