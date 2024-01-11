// This file configures Passport.js for user authentication in the Helpful Stranger application.
// It defines the LocalStrategy for authenticating users with a username (email) and password.
// Additionally, it handles serialization and deserialization of user objects for session management.

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models'); 

// Export a function that takes the passport instance as a parameter. Wrapping the Passport setup in a function that takes passport as an argument makes it more modular and easier to use in other parts of the application.
module.exports = (passport) => {
  // Configure Passport to use the LocalStrategy for user authentication
  passport.use(
    // LocalStrategy takes two arguments: an options object and a callback function for authentication
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Find a user in the database based on the provided email
        const user = await User.findOne({ where: { email: email } });

        // Check if the user exists and the password is correct. bcrypt.compareSync is used vs. the synchronous bcrypt.compare to better ensure compatibility with Passport's asynchronous nature.
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        // If authentication is successful, return the user object
        return done(null, user);
      } catch (err) {
        // Handle any errors that occur during authentication
        return done(err);
      }
    })
  );

  // Serialize user information to store in the session
  passport.serializeUser((user, done) => {
    done(null, user.id); //Serialize the user ID into the session
  });

  // Deserialize user information to retrieve from the session
  passport.deserializeUser(async (id, done) => {
    try {
      // Find the user in the database based on the stored ID
      const user = await User.findByPk(id);
      done(null, user); // Deserialize the user object from the session
    } catch (err) {
      // Handle any errors that occur during deserialization
      done(err);
    }
  });
};

