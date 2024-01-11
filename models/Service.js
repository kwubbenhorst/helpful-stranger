/*
 *This Sequelize model defines the Service entity in the application database.
 * It represents services offered on the service exchange platform, Helpful Stranger.
 *
 * Fields:
 * - service_id: Primary key for the Service table.
 * - title: Name or title of the service.
 * - description: Brief description of the service.
 * - provider_id: Foreign key referencing the User table, indicating the user providing the service (ie. the credit_earner).
 * - price: Price of the service in credits
 *
 * Relationships:
 * - Linked to the user providing the service.
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Service extends Model {}

Service.init(
  {
    // Primary Key
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Name or title of the service
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Brief description of the service
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Foreign Key: User referencing the provider (credit_earner)
    provider_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    // Price of the service in credits
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'service',
  }
);

module.exports = Service;
