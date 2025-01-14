import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
let key; 

export const setKey = (sessionKey) => {
    key = Buffer.from(sessionKey, 'hex'); 
};

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

const decrypt = (encryption) => {
    const iv = Buffer.from(encryption.iv, 'hex');
    const encryptedText = Buffer.from(encryption.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

export { encrypt, decrypt };