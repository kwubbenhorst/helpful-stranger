/*
 * This file is the entry point for the Helpful Stranger application. It sets up the Express server,
 * initializes session configuration, connects to the database, and defines routes.
 * 
 * Dependencies:
 * - express: Web application framework
 * - express-session: Session middleware for Express
 * - express-handlebars: Handlebars view engine for Express
 * - connect-session-sequelize: Session store for Sequelize
 * - sequelize: SQL ORM for Node.js
 * - path: Node.js module for handling file paths
 * - helpers: Custom helper functions for Handlebars
 * - routes: Application routes defined in the controllers folder
 * 
 * Notes:
 * - The session secret and other sensitive information is stored in the .env file.
 * - The database connection details are specified in the config/connection.js file.
 */
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); //Imports the controllers/index.js file
const helpers = require('./utils/helpers');
require('dotenv').config(); //because I am using env variables to hide the value of my secret, below.

// Import Sequelize connection
const sequelize = require('./config/connection');
// Import the SequelizeStore
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Define session configuration
const sess = {
  secret: process.env.SESSION_SECRET, // Reference to the SESSION_SECRET value in my .env file
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: true, //both Heroku and Render where I intend to deploy the app provide a https url, so I am setting this to true. It means that the cookie will only be sent over secure (HTTPS) connections
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use defined, aggregated routes, a reference to the main entry point for routes which is the index.js file in the controllers folder, which, in turn, includes the routes defined in the controllers/api files and controllers folder
app.use(routes);

// Sync Sequelize and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
