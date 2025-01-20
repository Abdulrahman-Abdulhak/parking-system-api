import forge from 'node-forge';

export function createCSR(user) {
  const { fullName, email } = user;

  const keypair = forge.pki.rsa.generateKeyPair(2048);
  const privateKey = keypair.privateKey;
  const publicKeyForge = keypair.publicKey;

  const csr = forge.pki.createCertificationRequest();
  csr.publicKey = publicKeyForge;
  csr.setSubject([{ name: 'commonName', value: fullName }, { name: 'emailAddress', value: email }]);
  csr.sign(privateKey);

  const pem = forge.pki.certificationRequestToPem(csr);

  return {
    csr: pem,
    privateKey: forge.pki.privateKeyToPem(privateKey),
  };
}

export function storeDigitalCertificate(userId, certificate, publicKey) {
  const DigitalCertificate = createDigitalCertificateModel();
  return DigitalCertificate.create({
    userId,
    certificate,
    publicKey,
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // سنة واحدة
  });
}