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

export const signData = (data) => {
    return crypto.createSign('SHA256').update(data).sign(serverPrivateKey, 'base64');
};

export const verifySignature = (data, signature) => {
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    return verify.verify(serverPublicKey, signature, 'base64');
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