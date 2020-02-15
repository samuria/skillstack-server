// const router = require('express-promise-router')();

const jobController = require('../controller').job;
const companyController = require('../controller').company;
const tagController = require('../controller').tag;

module.exports = app => {
  // Jobs
  app.get('/api/jobs', jobController.fetchAllJobs);
  app.get('/api/jobs/:slug', jobController.fetchBySlug);
  app.post('/api/jobs', jobController.createJob);

  // Companies
  app.get('/api/companies', companyController.fetchAllCompanies);
  app.get(
    '/api/companies/:company/jobs',
    companyController.fetchJobsForCompany
  );

  // Tags
  app.get('/api/tags', tagController.fetchAllTags);
  app.get('/api/tags/:slug/jobs', tagController.fetchJobByTag);
};

// // Jobs
// router.route('/api/jobs').get(jobController.fetchAllJobs);
// router.route('/api/jobs/:slug').get(jobController.fetchBySlug);
// router.route('/api/jobs').post(jobController.createJob);

// // Companies
// router.route('/api/companies').get(companyController.fetchAllCompanies);
// router
//   .route('/api/companies/:company/jobs')
//   .get(companyController.fetchJobsForCompany);

// // Tags
// router.route('/api/tags').get(tagController.fetchAllTags);
// router.route('/api/tags/:slug/jobs').get(tagController.fetchJobByTag);
