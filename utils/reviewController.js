/*
  This file defines functions used by the controllers/api/reviewRoutes.js file to perform CRUD operations on reviews.

  It contains Sequelize ORM functions for performing CRUD operations on reviews, such as:
  - Retrieving all reviews
  - Retrieving reviews for a specific user or service
  - Creating a new review
  - Updating a review
  - Deleting a review

  These functions interact with the Sequelize model for Review defined in the models folder.
  The functions are exported from here and required in by the controllers/api/reviewRoutes.js file, which defines API routes for reviews.

*/

const { Review } = require('../models');

const getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.findAll();
    res.status(200).json(allReviews);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getReviewsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const userReviews = await Review.findAll({
      where: { userId },
    });
    res.status(200).json(userReviews);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getReviewsByServiceId = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const serviceReviews = await Review.findAll({
      where: { serviceId },
    });
    res.status(200).json(serviceReviews);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Review.update(req.body, {
      where: { id },
    });
    if (updatedRows === 0) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    res.status(200).json({ message: 'Review updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReview = await Review.destroy({
      where: { id },
    });
    if (!deletedReview) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllReviews,
  getReviewsByUserId,
  getReviewsByServiceId,
  createReview,
  updateReview,
  deleteReview,
};