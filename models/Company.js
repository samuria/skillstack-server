const objectionSlug = require('objection-slug');
const BaseModel = require('./BaseModel');
const Job = require('./Job');

// Create the slug mixin
const slug = objectionSlug({
  sourceField: 'name',
  slugField: 'slug'
});

class Company extends slug(BaseModel) {
  static get tableName() {
    return 'companies';
  }
}

module.exports = { Company };
