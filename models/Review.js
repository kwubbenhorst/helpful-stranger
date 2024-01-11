/*
 * This Sequelize model defines the Review entity in the application database.
 * It represents reviews provided by users for completed services.
 *
 * Fields:
 * - review_id: Primary key for the Review table.
 * - rating: The numerical rating, 1-5, given by the user.
 * - comment: The credit_spender's comment on the service, visible to the credit_earner and the public.
 * - user_id: Foreign key referencing the User table, indicating the user giving the review.
 * - service_id: Foreign key referencing the Service table, indicating the service being reviewed.
 * - privateCommentByCreditEarner: The credit_earner's private comment on the service.
 * - privateCommentByCreditSpender: The credit_spender's private comment on the service.
 * - flags: The number of flags raised for a review, indicating discrepancies.
 * - moderatorComment: Text comment visible only to moderators.
 * - replyByCreditEarner: The credit_earner's reply to the comment.
 * - replyByCreditSpender: The credit_spender's reply to the comment.
 *
 * Relationships:
 * - Linked to the user and service involved in the review.
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
  {
    // Primary Key
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // The numerical rating, 1-5, given by the user.
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // The credit_spender's comment on the service, visible to the credit_earner and the public.
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Foreign Key: User referencing the reviewer
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    // Foreign Key: Service referencing the service being reviewed
    service_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'service',
        key: 'service_id',
      },
    },
    // The credit_earner's private comment on the service.
    privateCommentByCreditEarner: {
      type: DataTypes.TEXT,
    },
    // The credit_spender's private comment on the service.
    privateCommentByCreditSpender: {
      type: DataTypes.TEXT,
    },
    // The number of flags raised for a review, indicating discrepancies.
    flags: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // Text comment visible only to moderators.
    moderatorComment: {
      type: DataTypes.TEXT,
    },
    // The credit_earner's reply to the comment.
    replyByCreditEarner: {
      type: DataTypes.TEXT,
    },
    // The credit_spender's reply to the comment.
    replyByCreditSpender: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;

