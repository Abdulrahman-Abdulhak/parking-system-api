import bcrypt from "bcryptjs";
import { controllerWrapper } from "../middleware/index.js";
import { createUserModel, createCertificateRequestModel } from "../models/index.js";
import { CustomApiError } from "../errors/index.js";
import { genSessionKey, setUserID } from "../utils/index.js";
import { createCSR, storeDigitalCertificate } from "../utils/certificateUtils.js"; 

const onSuccess = (req, res, { status, message, user }) => {
  const key = genSessionKey(req);
  setUserID(req, user.id);

  res.status(status).json({ message, user, key });
};

export const userRegister = controllerWrapper(async (req, res) => {
  const { fullName, userType, phoneNumber, carPlate, password, username } = req.body;

  const existingUser = await createUserModel().findOne({
    where: { username },
  });

  if (existingUser) {
    throw new CustomApiError(`The username ${username} already exists`, 400);
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

  const { csr, privateKey } = createCSR(user);
  const CertificateRequest = createCertificateRequestModel();
  await CertificateRequest.create({ userId: user.id, csr });

  const certificate = 'Issued certificate'; 
  await storeDigitalCertificate(user.id, certificate, publicKey); 

  onSuccess(req, res, {
    status: 201,
    message: "User registered successfully",
    user,
  });
});

export const userLogin = controllerWrapper(async (req, res) => {
  const { username, password } = req.body;

  const user = await createUserModel().findOne({ where: { username } });
  if (!user) {
    throw new CustomApiError("Invalid credentials", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomApiError("Invalid credentials", 400);
  }

  onSuccess(req, res, {
    status: 200,
    message: "Login successful",
    user: {
      id: user.id,
      fullName: user.fullName,
      userType: user.userType,
    },
  });
});