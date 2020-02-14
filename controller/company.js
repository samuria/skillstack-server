const { Company } = require('../models/Company');

module.exports = {
  async createCompany(req, res) {
    console.log(req.body);
    try {
      const company = await Company.query().insertGraph({
        name: 'Acme',
        logo: 'www.example.com/png',
        website: 'www.example.com',
        twitter: 'www.example.com/twitter',
        linkedin: 'www.example.com/linkedin'
      });
      res.status(201).send(company);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async fetchAllCompanies(req, res) {
    const companies = await Company.query().withGraphFetched('jobs');
    res.status(200).send(companies);
  }
};
