const express = require('express');
const tourController = require('../controllers/tourController');

const authController = require('../controllers/authController');

const router = express.Router();

// provide extra information on what is being required for the route and it will always start with a ? on the URL
// searches the URL path, body, and query string of the request (in that order) for the specified parameter.
//If no parameter value exists anywhere in the request with the given name , it returns undefined
// router.param('id', tourController.checkID);

//create a checkbody middleware function
// check if body contains tour name and price property
// if not send back 404 bad request
// add it to the post handler stack

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .post(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
