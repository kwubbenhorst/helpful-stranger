/*
  This file contains functions to handle user-related operations.

  It defines functions that are called within the controllers/api/userRoutes.js file and used to perform operations such as:
  - Retrieving all users
  - Retrieving a specific user by ID
  - Creating a new user
  - Updating a user by ID
  - Deleting a user by ID

  These functions require and interact with the Sequelize model for User defined in the models folder.
  The functions in this file are required in userRoutes.js to implement user-related API endpoints.
*/

const { User } = require('../models'); 

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await User.update(req.body, { where: { id } });
    if (updatedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await User.destroy({ where: { id } });
    if (deletedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
