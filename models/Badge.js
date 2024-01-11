/*
 * This Sequelize model defines the Badge entity in the application database.
 * It represents badges earned by users based on specific achievements or criteria.
 *
 * Fields:
 * - badge_id: Primary key for the Badge table.
 * - name: Name of the badge (e.g., "Verified User, Heroic Helper").
 * - description: Brief description of the badge.
 * - threshold: The number of transactions or specific requirements needed to earn the badge.
 *
 * Relationships:
 * - No direct associations in this model. May be linked to users in business logic.
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Badge extends Model {}

Badge.init(
  {
    // Primary Key
    badge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Name of the badge (e.g., "Verified User, Heroic Helper").
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Brief description of the badge.
    description: {
      type: DataTypes.TEXT,
    },
    // The number of transactions or specific requirements needed to earn the badge.
    threshold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'badge',
  }
);

module.exports = Badge;

