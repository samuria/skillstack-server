const _ = require('lodash');
const async = require('async');
const { Job } = require('../models/Job');
const { Tag } = require('../models/Tag');

function isUniqueConstraintError(err) {
  if (!err) return false;
  var re = /^duplicate key value violates unique constraint/;
  return re.test(err.message);
}

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
      // Need to create the tags first if they don't exist.
      const tags = ['react', 'test tag'];

      findOrCreateTag(tags).then(async foundOrCreatedTags => {
        const job = await Job.query().insertGraph(
          [
            {
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

  async getAllJobs(req, res) {
    try {
      const jobs = await Job.query()
        .withGraphFetched('tags')
        .modifyGraph('tags', builder => {
          builder.select('name', 'slug');
        });
      res.status(200).send(jobs);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
