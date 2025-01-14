import { Router } from "express";
import bcrypt from "bcryptjs";

import { User, createUsersTable } from "../models/User.js";

const router = Router();
createUsersTable();

router.post("/register", async (req, res) => {
  const { fullName, userType, phoneNumber, carPlate, password, username } =
    req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `${username} User already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      userType,
      phoneNumber,
      carPlate,
      password: hashedPassword,
      username,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { fullName: user.fullName, userType: user.userType },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
