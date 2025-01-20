import { DataTypes } from "sequelize";
import { ormDriver } from "./ORM.js";

// ! Converted from normal object creation pattern to Singelton Pattern
/**
 * @type {import("sequelize").ModelCtor<Model<any, any>>}
 */
let Payment = null;

// TODO: add validation.
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
