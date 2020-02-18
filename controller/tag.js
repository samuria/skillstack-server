const { Tag } = require('../models/Tag');
const { Job } = require('../models/Job');

module.exports = {
  async fetchAllTags(req, res) {
    try {
      const tags = await Tag.query();
      res.status(200).send(tags);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async fetchJobByTag(req, res) {
    try {
      const jobs = await Job.query()
        .whereExists(Job.relatedQuery('tags').where('slug', req.params.slug))
        .withGraphFetched('[tags(selectNameAndSlug), company(omitTimestamps)]');
      res.status(200).send(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};
