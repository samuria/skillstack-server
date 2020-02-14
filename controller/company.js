const { Company } = require('../models/Company');

module.exports = {
  async fetchAllCompanies(req, res) {
    const companies = await Company.query();
    res.status(200).send(companies);
  }
};
