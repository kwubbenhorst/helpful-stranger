/*
 *This Sequelize model defines the User entity in the application database.
 * It represents users who participate in the service exchange platform, Helpful Stranger.
 *
 * Fields:
 * - user_id: Primary key for the User table.
 * - username: Chosen username for the user (often the first part of an email address eg. amaqsood19).
 * - email: User's email address (used for login and communication).
 * - password: Hashed password for user authentication.
 * - first_name: User's first name.
 * - last_name: User's last name.
 * - profile_pic: Path or URL to the user's profile picture.
 * - user_about: Short self-introduction by the user to display with their profile
 * - city: the city where the user lives
 * - city_quadrant: the quadrant of the city (SE, SW, NE, NW) where the user lives. 
 * - credit_balance: Current balance of credits for the user.
 * - badge_count: Number of badges earned by the user.
 * - police_check_uploaded: Boolean indicating whether a police check has been uploaded.
 *
 * Relationships:
 * - None directly defined in this model. Other models reference User.
 */
 const { Model, DataTypes } = require('sequelize');
 const bcrypt = require('bcrypt');
 const sequelize = require('../config/database');
 
 class User extends Model {
   checkPassword(loginPw) {
     return bcrypt.compareSync(loginPw, this.password);
   }
 }
 
 User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: true, // Allow users not to have a profile picture
      validate: {
        isUrl: true, // Validate that it's a URL.  Application only allowing urls at this point.
      },
    },
    user_about: {
      type: DataTypes.TEXT,
      validate: {
        len: [100, 1250],
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_quadrant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credit_balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    badge_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    police_check_uploaded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
   },
   {
     hooks: {
       beforeCreate: async (newUserData) => {
         newUserData.password = await bcrypt.hash(newUserData.password, 10);
         return newUserData;
       },
       beforeUpdate: async (updatedUserData) => {
         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
         return updatedUserData;
       },
     },
     sequelize,
     timestamps: false,
     freezeTableName: true,
     underscored: true,
     modelName: 'user',
   }
 );
 
 module.exports = User;
 
