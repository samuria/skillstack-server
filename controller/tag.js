const { Tag } = require('../models/Tag');

module.exports = {
  async getAllTags(req, res) {
    try {
      const tags = await Tag.query();
      res.status(200).send(tags);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

// async getJobsByTag(req, res) {
//     try {
//       const jobs = await Job.relatedQuery('tags').for(500);
//       res.status(200).send(jobs);
//     } catch (error) {
//       res.status(404).send('No jobs found.');
//     }
//   }
