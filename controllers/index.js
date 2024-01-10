//This controllers/index.js file is where the application aggregates and organizes all its routes. It imports the various route files and uses them with app.use() in the server.js file.
const express = require('express');
const userRoutes = require('./api/userRoutes');
const serviceRoutes = require('./api/serviceRoutes');
const reviewRoutes = require('./api/reviewRoutes');
const homeRoutes = require('./homeRoutes');

const router = express.Router();

// Use the routes from different files
router.use('/api/users', userRoutes);
router.use('/api/services', serviceRoutes);
router.use('/api/reviews', reviewRoutes);
router.use('/', homeRoutes);

module.exports = router;