const _ = require('lodash');
const { Job } = require('../models/Job');
const { Company } = require('../models/Company');
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

    if (fetched.length === 0) {
      try {
        fetched = await Tag.query().insert({ name: tag });
      } catch (error) {
        if (isUniqueConstraintError) {
          fetched = await Tag.query().where({ name: tag });
        }
      }
    }
    completeTags.push(fetched);
  }

  return _.flatMap(completeTags);
}

async function findOrCreateCompany(company) {
  var fetched = await Company.query().where({
    name: company.name
  });

  if (fetched.length === 0) {
    try {
      fetched = await Company.query().insert(company);
    } catch (error) {
      if (isUniqueConstraintError) {
        fetched = await Company.query().where({ name: company.name });
      }
    }
  }

  return fetched;
}

module.exports = {
  async createJob(req, res) {
    const foundOrCreatedCompany = await findOrCreateCompany(req.body.company);

    try {
      // Need to create the tags first if they don't exist.
      // const tags = ['vuejs'];
      findOrCreateTag(req.body.tags).then(async foundOrCreatedTags => {
        const job = await Job.query()
          .insertGraph(
            {
              email: req.body.email,
              position: req.body.position,
              description: req.body.description,
              location: req.body.location,
              type: req.body.type,
              apply_url: req.body.apply_url,
              apply_email: req.body.apply_email,
              tags: foundOrCreatedTags,
              company: foundOrCreatedCompany
            },
            { relate: true }
          )
          .first();
        res.status(201).send(job);
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async fetchAllJobs(req, res) {
    try {
      const jobs = await Job.query().withGraphFetched(
        '[tags(selectNameAndSlug), company(omitTimestamps)]'
      );

      res.status(200).send(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async fetchBySlug(req, res) {
    const job = await Job.query()
      .where({ slug: req.params.slug })
      .withGraphFetched('[tags(selectNameAndSlug), company(omitTimestamps)]')
      .first();

    if (job) {
      res.status(200).send(job);
    } else {
      res.status(404).send('Resource not found');
    }
  }
};
