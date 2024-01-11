/*
 * This test suite (auth.test.js) is designed to verify the functionality of user authentication
 * implemented in the Helpful Stranger application. It specifically tests the integration of
 * Passport.js, express-session, and cookies within the authentication process.
 * 
 * Dependencies:
 * - chai: Assertion library
 * - chai-http: HTTP integration testing with Chai assertions
 * - server.js: The main entry point for the application, where Passport.js and authentication are configured
 * - config/passport.js: Configuration file for Passport.js, defining the LocalStrategy and serialization/deserialization
 * - controllers/api/userRoutes.js: API routes related to user management
 * 
 * Notes:
 * - The server should be running and accessible during the test. 
 * - These tests use the Chai assertion library and the chai-http plugin to simulate HTTP requests and validate responses.
 * - mockUser is used to test successful login, since  I have no db created yet at the time of developing this test.
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Import your Express app instance

const { expect } = chai;
chai.use(chaiHttp);

describe('Authentication Endpoints', () => {
  it('should return 200 status when accessing login page', async () => {
    const res = await chai.request(app).get('/login');
    expect(res).to.have.status(200);
  });

  it('should return 401 status for unsuccessful login attempt', async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send({ email: 'nonexistent@example.com', password: 'wrongpassword' });

    expect(res).to.have.status(401);
  });

  it('should return 200 status for successful login attempt', async () => {
    // Use mock data for successful login attempt since I built authentication feature first and want to test it before creating the database
    const mockUser = { email: 'user@example.com', password: 'correctpassword' };
    const res = await chai
      .request(app)
      .post('/login')
      .send(mockUser);

    expect(res).to.have.status(200);
  });
});
