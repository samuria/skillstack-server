const jobController = require('../controller').job;
const companyController = require('../controller').company;
const tagController = require('../controller').tag;

module.exports = app => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      data: 'Welcome to Node API v1'
    });
  });

  // Jobs
  app.get('/api/jobs', jobController.fetchAllJobs);
  app.get('/api/jobs/:slug', jobController.fetchBySlug);
  app.post('/api/jobs', jobController.createJob);

  // Companies
  app.get('/api/companies', companyController.fetchAllCompanies);
  app.post('/api/companies', companyController.createCompany);

  // Tags
  app.get('/api/tags', tagController.fetchAllTags);
  app.get('/api/tags/:slug/jobs', tagController.fetchJobByTag);
};
