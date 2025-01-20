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
        references: {
          model: "Users",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });
  }

  return Payment;
};

export const createPaymentsTable = () => {
  return createPaymentModel().sync();
};
