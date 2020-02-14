const express = require('express');
const bodyParser = require('body-parser');
const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');

// Initialise knex
const knex = Knex(knexConfig.development);

// Bind all Models to the knex instance.
// You only need to do this once before
// you use any of your model classes.
Model.knex(knex);

// Setup express
const app = express();
app.use(bodyParser.json());
app.use('/api', express.static('public')); // Load documentation on root endpoint

// Bring in api routes
require('./routes')(app);

// Listen to API
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
