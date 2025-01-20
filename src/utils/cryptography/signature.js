import md5 from "md5";

import {
  decryptData,
  encryptData,
  getServerPrivateKey,
  getServerPublicKey,
} from "./asymmetric.js";

export const getSignature = (req, data) => {
  const dataAsString = JSON.stringify(data);

  const hash = md5(dataAsString);
  return encryptData(getServerPublicKey(req), hash);
};

export const verifySignature = (req, data, signature) => {
  const decryptedSignature = decryptData(getServerPrivateKey(req), signature);
  const dataAsString = JSON.stringify(data);

  return decryptedSignature === md5(dataAsString);
};
