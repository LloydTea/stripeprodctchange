'use strict';
module.exports = function(app) {
  var subscriptionController = require('../controllers/subscriptionController');

  // todoList Routes
  app.route('/onSubscriptionCreate').post(subscriptionController.onSubscriptionCreated).get(subscriptionController.testGetRequest);
};
