/*
  This file defines API routes for handling reviews, including CRUD operations such as:
  - Creating a new review
  - Retrieving reviews for a specific user or service
  - Updating a review
  - Deleting a review

  These routes call the functions defined in the utils/reviewController.js file.
 This file is referenced (required in and used by) in the server.js file to set up API endpoints related to reviews.
*/

const router = require('express').Router();
const {
  getAllReviews,
  getReviewsByUserId,
  getReviewsByServiceId,
  createReview,
  updateReview,
  deleteReview,
} = require('../../utils/reviewController');

// API endpoints for reviews
router.get('/', getAllReviews);
router.get('/users/:userId', getReviewsByUserId);
router.get('/services/:serviceId', getReviewsByServiceId);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;