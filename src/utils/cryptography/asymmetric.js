import RSA from "node-rsa";

export const getServerPrivateKey = (req) => {
  if (!req.session.keys?.privateKey) generateServerKeys(req);
  return req.session.keys.privateKey;
};

export const getServerPublicKey = (req) => {
  if (!req.session.keys?.publicKey) generateServerKeys(req);
  return req.session.keys.publicKey;
};

export const generateServerKeys = (req) => {
  const keys = new RSA({ b: 1024 });
  const publicKey = keys.exportKey("public");
  const privateKey = keys.exportKey("private");

  const geneKeys = {
    publicKey,
    privateKey,
  };

  req.session.keys = geneKeys;
};

export const encryptData = (key, data) => {
  const keyPublic = new RSA(key);
  const encryption = keyPublic.encrypt(data, "base64");
  return encryption;
};

export const decryptData = (key, data) => {
  const keyPrivate = new RSA(key);
  const decryption = keyPrivate.decrypt(data, "utf8");
  return decryption;
};
