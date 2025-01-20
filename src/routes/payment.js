import { Router } from "express";
import { initPaymentKeys, createPayment } from '../controllers/payment.js';

const router = Router();

router.post('/init', initPaymentKeys);
router.post('/pay', createPayment);

export default router;