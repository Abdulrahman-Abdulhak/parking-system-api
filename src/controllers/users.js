import bcrypt from "bcryptjs";

import { controllerWrapper } from "../middleware/index.js";
import { createUserModel, dataCleanser } from "../models/index.js";
import { CustomApiError } from "../errors/index.js";
import { Asymmetric, genSessionKey, setUserID } from "../utils/index.js";

const onSuccess = (req, res, { status, message, user }) => {
  const sessionKey = genSessionKey(req);
  setUserID(req, user.id);

  res.status(status).json({
    message,
    user,
    package: {
      session: sessionKey,
      public: Asymmetric.getServerPublicKey(req),
    },
  });
};

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

  const user = await dataCleanser(createUserModel(), {
    fullName,
    userType,
    phoneNumber,
    carPlate,
    password: hashedPassword,
    username,
  });

  onSuccess(req, res, {
    status: 201,
    message: "user registered successfully",
    user,
  });
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

  onSuccess(req, res, {
    status: 200,
    message: "login successful",
    user: {
      id: user.id,
      fullName: user.fullName,
      userType: user.userType,
    },
  });
});
