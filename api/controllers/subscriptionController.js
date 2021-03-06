'use strict';

// Set your secret key: remember to change this to live secret key in production
const stripe = require("stripe")('sk_test_D8egme1hdXiN5xVD6pGTMagm');

exports.onSubscriptionCreated = function(req, res) {
  console.log(JSON.stringify(req.body))
  const PROD_A = 'prod_ESDXAeESlS8IHe';
  const PROD_A_PLAN_ID = 221;
  const PROD_B = 'prod_ESDaUCaVuyZv1m';
  const PROD_B_PLAN_ID = 222;
  var customerID = req.body.data.object.customer;
  var product = req.body.data.object.plan.name;
  var planID = req.body.data.object.plan.id;
  console.log('Customer ' + customerID + ' purchased subscription to ' + product + '.');
  if (planID == PROD_B_PLAN_ID) {
    console.log('Since ' + PROD_B + ' subscription was purchased, ' + PROD_A + ' subscription needs to be cancelled...');
    // Customer purchased Product B plan. Cancel purchase of Product A plan.
    // Wait 5 seconds in case the Product B plan made it into Stripe before the Product A plan did.
    // wait(5000);
    // Lookup Product A plan for customer
    return stripe.subscriptions.list({customer: customerID, plan: PROD_A_PLAN_ID})
    .then(subscriptions => {
      if (subscriptions.data.length == 0) console.log('No ' + PROD_A + ' subscriptions were found for this customer.');
      for (var i = 0; i < subscriptions.data.length; i++) {
        return stripe.subscriptions.del(subscriptions.data[i].id)
        .then(subscription => {
          console.log('Subscription ' + subscriptions.data[i].id + ' to ' + PROD_A + ' was cancelled.');
        })
      }
    })
    .then(() => {
      console.log('Successfully processed event.');
      res.status(200).send('Successfully processed event. Subscription to ' + PROD_A + ' cancelled.');
    })
    .catch(err => {
      console.log('Attempt to cancel subscription to ' + PROD_A + ' resulted in Stripe error type ' + err.type);
      console.log(err.message);
      res.status(400).send('Attempt to cancel subscription resulted in Stripe error type ' + err.type + '. ' + err.message);
    });
  } else {
    console.log('Successfully processed event. No action needed.');
    res.status(200).send('Successfully processed event. No action needed.');
  }
};

exports.confirmOnSubscriptionCreated = function (req, res){
  
  console.log('Retrieved onSubscriptionCreated webhook request!');
  res.sendStatus(200)
}

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
  }
}
