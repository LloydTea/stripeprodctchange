var express = require('express');
var app = express();
var port = process.env.PORT;
var bodyParser = require('body-parser');

// Initiate bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Create routes
var subscriptionRoutes = require('./api/routes/subscriptionRoutes');
subscriptionRoutes(app);

// Start server
app.listen(port, () => {
  console.log('Stripe automation server started on port: ' + port);
});
