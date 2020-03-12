require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialise knex
const Knex = require('knex');
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig.development);

// Bind all Models to the knex instance.
// You only need to do this once before
// you use any of your model classes.
const { Model } = require('objection');
Model.knex(knex);

// Setup express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static('public')); // Load documentation on root endpoint

// Bring in api routes
require('./routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
