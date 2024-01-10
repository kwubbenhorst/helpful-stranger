/*
 This file defines API routes for services in the Helpful Stranger application.

  It contains Express.js routes for performing operations related to services, such as:
  - Retrieving all services
  - Retrieving a specific service by ID
  - Creating a new service
  - Updating a service by ID
  - Deleting a service by ID

  These routes call the functions provided in the utils/serviceController.js file, which interacts with the Sequelize model for Service defined in the models folder.
  These routes are incorporated into the main Express application in the server.js file where they are required and used.
*/

const router = require('express').Router();
const { getAllServices, getServiceById, createService, updateService, deleteService } = require('../../utils/serviceController');

// API routes for services
router.get('/services', getAllServices);
router.get('/services/:id', getServiceById);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

module.exports = router;
