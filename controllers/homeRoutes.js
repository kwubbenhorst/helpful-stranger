/*
 * This file defines routes related to the home page, user profile, and authentication.
 *
 * Routes:
 * - GET /: Renders the home page with services and reviews.
 * - GET /service/:id: Renders a specific service based on its ID.
 * - GET /profile: Protected route, renders the user's profile if authenticated.
 * - GET /login: Renders the login page.
 *
 * Authentication:
 * - The /profile route is protected using the withAuth middleware.
 * - The withAuth middleware is defined in the utils/auth.js file.
 */

const router = require('express').Router();
const { User, Service, Review } = require('../models'); // Adjust the path based on your structure
const withAuth = require('../utils/auth'); // Middleware for authentication

// GET /: Renders the home page with services and reviews
router.get('/', async (req, res) => {
  try {
    // Get all services with associated reviews
    const serviceData = await Service.findAll({
      include: [
        {
          model: Review,
        },
      ],
    });

    // Serialize data so the template can read it
    const services = serviceData.map((service) => service.get({ plain: true }));

    // Pass serialized data and session flag into the template
    res.render('homepage', {
      services,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /service/:id: Renders a specific service based on its ID
router.get('/service/:id', async (req, res) => {
  try {
    const serviceData = await Service.findByPk(req.params.id, {
      include: [
        {
          model: Review,
        },
      ],
    });

    const service = serviceData.get({ plain: true });

    res.render('service', {
      ...service,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /profile: Protected route, renders the user's profile if authenticated
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Service, include: [Review] }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /login: Renders the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;

