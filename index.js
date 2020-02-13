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

// Initialize express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Bring in api routes
require('./routes')(app);

// Listen to API
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

// async function main() {
//   // Delete all jobs from the db.

//   // Insert one row to the database.
//   await Job.query().insert({
//     position: 'Jr. Software Developer',
//     location: 'Adelaide'
//   });

//   // Read all rows from the db.
//   const people = await Job.query();

//   console.log(people);
// }

// knex.destroy().catch(err => {
//   console.error(err);
//   return knex.destroy();
// });
