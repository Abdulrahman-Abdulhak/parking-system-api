import { DataTypes } from 'sequelize';
import { ormDriver } from '../ORM.js';

let CertificateRequest = null;

export const createCertificateRequestModel = () => {
  if (!CertificateRequest) {
    const orm = ormDriver();
    CertificateRequest = orm.define('CertificateRequest', {
      userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, references: { model: 'User', key: 'id' }
     },
      csr: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
      status: { 
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
         defaultValue: 'pending'
         },
      createdAt: { 
        type: DataTypes.DATE,
         defaultValue: DataTypes.NOW 
        },
    });
  }
  return CertificateRequest;
};

export const createCertificateRequestsTable = () => {
  return createCertificateRequestModel().sync();
};