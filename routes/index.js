const jobController = require('../controller').job;
const tagController = require('../controller').tag;

module.exports = app => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      data: 'Welcome to Node API v1'
    });
  });

  // Jobs
  app.get('/api/jobs', jobController.fetchAll);
  app.get('/api/jobs/byslug', jobController.fetchBySlug);
  app.get('/api/jobs/create', jobController.createJob);

  // Tags
  app.get('/api/tags', tagController.getAllTags);
};
