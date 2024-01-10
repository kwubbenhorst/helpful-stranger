/*
  This file contains functions that are called within the controllers/api/serviceRoutes.js file
  and used to perform operations such as:
  - Retrieving all services
  - Retrieving a specific service by ID
  - Creating a new service
  - Updating a service by ID
  - Deleting a service by ID

  These functions interact with the Sequelize model for Service defined in the models folder.
  The functions in this file are exported from here and required in controllers/api/serviceRoutes.js to implement service-related API endpoints.
*/
const { Service } = require('../models');

const getAllServices = async (req, res) => {
  try {
    const allServices = await Service.findAll();
    res.status(200).json(allServices);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Service.update(req.body, {
      where: { id },
    });
    if (updatedRows === 0) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.status(200).json({ message: 'Service updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedService = await Service.destroy({
      where: { id },
    });
    if (!deletedService) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};