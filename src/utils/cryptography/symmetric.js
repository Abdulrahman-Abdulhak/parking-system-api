import crypto from "crypto";
import { genRandomString } from "../math/index.js";

export const genNewKey = () => {
  return genRandomString(32);
};

const defaultOptions = {
  ivLength: 16,
  algorithm: "aes256",
  inputEncoding: "utf8",
  outputEncoding: "hex",
};

/**
 *
 * @param {string} key
 * @param {string} text
 * @param {Object} options
 * @param {number} options.ivLength
 * @param {string} options.algorithm
 * @param {string} options.inputEncoding
 * @param {string} options.outputEncoding
 * @returns
 */
export const cipherText = (key, text, options = {}) => {
  const setOptions = { ...defaultOptions, ...options };

  const keyBuffered = Buffer.from(key, "latin1");
  const iv = crypto.randomBytes(setOptions.ivLength);

  const cipher = crypto.createCipheriv(setOptions.algorithm, keyBuffered, iv);

  let ciphered = cipher.update(
    text,
    setOptions.inputEncoding,
    setOptions.outputEncoding
  );
  ciphered += cipher.final(setOptions.outputEncoding);

  const cipherText = iv.toString(setOptions.outputEncoding) + ":" + ciphered;

  return cipherText;
};

/**
 *
 * @param {string} key
 * @param {string} cipherText
 * @param {Object} options
 * @param {string} options.algorithm
 * @param {string} options.inputEncoding
 * @param {string} options.outputEncoding
 * @returns
 */
export const decipher = (key, cipherText, options = {}) => {
  const setOptions = { ...defaultOptions, ...options };

  const components = cipherText.split(":");
  const iv_from_cipherText = Buffer.from(
    components.shift(),
    setOptions.outputEncoding
  );
  const keyBuffered = Buffer.from(key, "latin1");

  const decipher = crypto.createDecipheriv(
    setOptions.algorithm,
    keyBuffered,
    iv_from_cipherText
  );

  let deciphered = decipher.update(
    components.join(":"),
    setOptions.outputEncoding,
    setOptions.inputEncoding
  );
  deciphered += decipher.final(setOptions.inputEncoding);

  return deciphered;
};
