import crypto from "crypto";

const algorithm = "aes-256-cbc";
let key;

let serverPrivateKey, serverPublicKey, clientPrivateKey, clientPublicKey;

export const setKey = (sessionKey) => {
  key = Buffer.from(sessionKey, "hex");
};

const generateKeyPair = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  return { publicKey, privateKey };
};

export const setServerKeys = () => {
  const keys = generateKeyPair();
  serverPrivateKey = keys.privateKey;
  serverPublicKey = keys.publicKey;
};

export const setClientKeys = () => {
  const keys = generateKeyPair();
  clientPrivateKey = keys.privateKey;
  clientPublicKey = keys.publicKey;
};

export const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

export const decrypt = (encryption) => {
  const iv = Buffer.from(encryption.iv, "hex");
  const encryptedText = Buffer.from(encryption.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export const encryptData = (data, publicKey) => {
  const buffer = Buffer.from(data);
  return crypto.publicEncrypt(publicKey, buffer).toString("base64");
};

export const decryptData = (data, privateKey) => {
  const buffer = Buffer.from(data, "base64");
  return crypto.privateDecrypt(privateKey, buffer).toString("utf8");
};

export const getServerKeys = () => {
  return {
    publicKey: serverPublicKey,
    privateKey: serverPrivateKey,
  };
};

export const getClientKeys = () => {
  return {
    publicKey: clientPublicKey,
    privateKey: clientPrivateKey,
  };
};
