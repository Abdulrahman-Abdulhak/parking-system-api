import bcrypt from "bcryptjs";

import { controllerWrapper } from "../middleware/index.js";

import { createUserModel } from "../models/index.js";
import { CustomApiError } from "../errors/index.js";

export const userRegister = controllerWrapper(async (req, res) => {
  const { fullName, userType, phoneNumber, carPlate, password, username } =
    req.body;

  const existingUser = await createUserModel().findOne({
    where: { username },
  });
  if (existingUser) {
    throw new CustomApiError(`the username ${username} already exists`, 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUserModel().create({
    fullName,
    userType,
    phoneNumber,
    carPlate,
    password: hashedPassword,
    username,
  });

  res.status(201).json({ message: "user registered successfully", user });
});

export const userLogin = controllerWrapper(async (req, res) => {
  const { username, password } = req.body;

  const user = await createUserModel().findOne({ where: { username } });
  if (!user) {
    throw new CustomApiError("invalid credentials", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomApiError("invalid credentials", 400);
  }

  res.status(200).json({
    message: "login successful",
    user: { fullName: user.fullName, userType: user.userType },
  });
});
