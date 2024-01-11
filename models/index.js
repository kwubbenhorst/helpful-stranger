/*
 * This file, models/index.js, serves as the central hub for defining and organizing
 * associations between different Sequelize models in the Helpful Stranger application.
 * It consolidates the associations between User, Service, Review, Badge, Transaction,
 * and any other models as needed. Associations establish relationships and connections 
 * between various entities within the application's database.
 * Any additional associations should be added here as the application evolves.
 */

const User = require('./User');
const Service = require('./Service');
const Review = require('./Review');
const Badge = require('./Badge');
const Transaction = require('./Transaction');

// Define Associations
User.hasMany(Service, { foreignKey: 'provider_id' });
Service.belongsTo(User, { foreignKey: 'provider_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Transaction, { foreignKey: 'credit_earner_id', as: 'earner_transactions' });
Transaction.belongsTo(User, { foreignKey: 'credit_earner_id', as: 'earner' });

User.hasMany(Transaction, { foreignKey: 'credit_spender_id', as: 'spender_transactions' });
Transaction.belongsTo(User, { foreignKey: 'credit_spender_id', as: 'spender' });

User.belongsToMany(Badge, { through: 'user_badge', foreignKey: 'user_id' });
Badge.belongsToMany(User, { through: 'user_badge', foreignKey: 'badge_id' });

Service.hasMany(Review, { foreignKey: 'service_id' });
Review.belongsTo(Service, { foreignKey: 'service_id' });


module.exports = {
  User,
  Service,
  Review,
  Badge,
  Transaction,
};








