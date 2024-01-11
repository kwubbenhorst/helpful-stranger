/*
 * This Sequelize model defines the Transaction entity in the application database.
 * It represents credit transactions between users on the platform.
 *
 * Fields:
 * - transaction_id: Primary key for the Transaction table.
 * - credit_earner_id: User ID of the credit earner.
 * - credit_spender_id: User ID of the credit spender.
 * - amount: The number of credits exchanged.
 * - timestamp: Timestamp indicating when the transaction occurred.
 *
 * Relationships:
 * - Linked to users (credit earner and credit spender) involved in the credit exchange.
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model {}

Transaction.init(
  {
    // Primary Key
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // User ID of the credit earner.
    credit_earner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    // User ID of the credit spender.
    credit_spender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    // The number of credits exchanged.
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Timestamp indicating when the transaction occurred.
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'transaction',
  }
);

module.exports = Transaction;

