
/*
  This controllers/api/index.js file aggregates all the api routes (userRoutes, serviceRoutes, reviewRoutes) and any others that may be added in the future. It does not handle non-API routes. That is done by controllers/index.js, the top level aggregator.
  This file is required in and used by the controllers/index.js file to define the API routes. It exports the configured routes, including organized API routes for use in the broader application.
*/

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const serviceRoutes = require('./serviceRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/services', serviceRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;