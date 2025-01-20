import crypto from 'crypto';

let serverPrivateKey, serverPublicKey;

export const generateServerKeys = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });
    serverPrivateKey = privateKey;
    serverPublicKey = publicKey.export({ type: 'spki', format: 'pem' });
    return serverPublicKey;
};

export const encryptSessionKey = (sessionKey, publicKey) => {
    return crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(sessionKey)
    ).toString('base64');
};

export const decryptSessionKey = (encryptedSessionKey) => {
    return crypto.privateDecrypt(
        {
            key: serverPrivateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(encryptedSessionKey, 'base64')
    ).toString('utf8');
};

export const decryptPaymentData = (encryptedPaymentData, sessionKey) => {
    return crypto.privateDecrypt(
        {
            key: sessionKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(encryptedPaymentData, 'base64')
    ).toString('utf8');
};