const _ = require('lodash');
const async = require('async');
const { Job } = require('../models/Job');
const { Tag } = require('../models/Tag');

async function findOrCreateTag(tags) {
  var completeTags = [];

  for (const tag of tags) {
    var fetched = await Tag.query().where({ name: tag });
    var exists = true;

    if (fetched.length === 0) {
      try {
        fetched = await Tag.query().insert({ name: tag });
        exists = false;
      } catch (error) {
        console.log(error);
        if (isUniqueConstraintError) {
          fetched = await Tag.query().where({ name: tag });
          exists = true;
        }
      }
    }
    completeTags.push(fetched);
  }

  return _.flatMap(completeTags);
}

module.exports = {
  async createJob(req, res) {
    try {
      // await Job.query().delete();

      // Need to create the tags first if they don't exist.
      const tags = ['brand new tag', 'hellllll yeahhhh it works'];

      findOrCreateTag(tags).then(async foundOrCreatedTags => {
        console.log(foundOrCreatedTags);
        const job = await Job.query().insertGraph(
          [
            {
              slug: 'software-developer',
              email: 'umar@gmail.com',
              position: 'Jr. Software Developer',
              description: 'This is not a good opportunity for jr devs',
              location: 'Adelaide',
              type: 'Full Time',
              apply_url: 'http://www.example.com',
              apply_email: 'example@example.com',
              tags: foundOrCreatedTags
            }
          ],
          { relate: ['tags'] }
        );

        res.status(201).send(job);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  async
};
