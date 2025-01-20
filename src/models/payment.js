import { DataTypes } from 'sequelize';
import { ormDriver } from "./ORM.js";

export const Payment = sequelize.define('Payment', {
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
        defaultValue: 'pending',
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