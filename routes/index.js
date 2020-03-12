// const router = require('express-promise-router')();

const jobController = require('../controller').job;
const companyController = require('../controller').company;
const tagController = require('../controller').tag;

module.exports = app => {
  // Jobs
  app.get('/jobs', jobController.fetchAllJobs);
  app.get('/jobs/:slug', jobController.fetchBySlug);
  app.post('/jobs', jobController.createJob);

  // Companies
  app.get('/companies', companyController.fetchAllCompanies);
  app.get('/companies/:company/jobs', companyController.fetchJobsForCompany);

  // Tags
  app.get('/tags', tagController.fetchAllTags);
  app.get('/tags/:slug/jobs', tagController.fetchJobByTag);
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
