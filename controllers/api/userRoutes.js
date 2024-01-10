/*
  This file is responsible for defining API routes related to user management.

  This file contains routes for handling user-related operations such as:
  - Retrieving all users
  - Retrieving a specific user by ID
  - Creating a new user
  - Updating a user by ID
  - Deleting a user by ID

  These routes are implemented using functions from the userController.js file in the utils folder.
  This file is required in the server.js file to set up API endpoints.
*/

const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../../utils/userController');

// Define user-related API routes
router.get('/', getAllUsers); // Get all users
router.get('/:id', getUserById); // Get a specific user by ID
router.post('/', createUser); // Create a new user
router.put('/:id', updateUser); // Update a user by ID
router.delete('/:id', deleteUser); // Delete a user by ID

module.exports = router;
