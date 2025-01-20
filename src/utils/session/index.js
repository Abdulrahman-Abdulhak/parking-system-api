import { Symmetric } from "../cryptography/index.js";

export const getSessionKey = (req) => {
  return req.session.sysKey;
};

export const setSessionKey = (req, key) => {
  req.session.sysKey = key;
};

export const genSessionKey = (req) => {
  const symKey = Symmetric.genNewKey();
  req.session.symKey = symKey;
};

export * from "./user/index.js";
