import express from 'express';
import { Reservation } from '../models/Reservation.js';
import { User } from '../models/User.js'; 
import { encrypt, decrypt, setKey } from '../utils/encryption.js'; 

const router = express.Router();


router.post('/setSessionKey', (req, res) => {
    const { sessionKey } = req.body;
    if (!sessionKey) {
        return res.status(400).json({ message: "Session key is required" });
    }
    setKey(sessionKey);
    res.json({ message: "Session key set successfully" });
});

router.post('/reserve', async (req, res) => {
    const { spotNumber, userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const reservationData = JSON.stringify({
        spotNumber,
        reservedAt: new Date().toISOString()
    });
    const encryptedData = encrypt(reservationData);

    try {
        await Reservation.create({
            spotNumber,
            reservedAt: new Date(),
            userId
        });
        res.json({
            message: "Reservation confirmed",
            data: encryptedData,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating reservation", error: error.message });
    }
});


router.post('/confirm', (req, res) => {
    const { encryptedData, iv } = req.body;


    const decryptedData = decrypt({ iv, encryptedData });
    const { spotNumber, reservedAt } = JSON.parse(decryptedData);

    res.json({
        message: "Data received and decrypted",
        spotNumber,
        reservedAt,
    });
});

export default router;