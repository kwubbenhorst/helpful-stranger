/*
  This controllers/index.js file is a top-level routes aggregator for the application. It aggregates both API and non-API routes.
  For API routes, it defers to the controllers/api/index.js file, which serves as a lower-level aggregator for specific API prefixes.
  It is required by the server.js file to set up the main application routes.
  It exports the configured router, which includes both API and non-API routes, for use in other parts of the application.
*/  

const express = require('express');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

const router = express.Router();

// Use the routes from different files
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;