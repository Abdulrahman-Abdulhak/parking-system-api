import { DataTypes } from 'sequelize';
import { ormDriver } from './ORM.js';

let Payment = null;

export const createPaymentModel = () => {
  if (Payment == null) {
    const orm = ormDriver();

    Payment = orm.define("Payment", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  }

  return Payment;
};

export const createPaymentsTable = () => {
  return createPaymentModel().sync();
};