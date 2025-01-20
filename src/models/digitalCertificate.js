import { DataTypes, Model } from "sequelize";
import { ormDriver } from "./ORM.js";

let DigitalCertificate = null;

export const createDigitalCertificateModel = () => {
  if (DigitalCertificate == null) {
    const orm = ormDriver();

    DigitalCertificate = orm.define("DigitalCertificate", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      certificate: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      publicKey: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      issuedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  }

  return DigitalCertificate;
};

export const createDigitalCertificatesTable = () => {
  return createDigitalCertificateModel().sync();
};