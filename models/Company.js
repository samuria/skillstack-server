const path = require('path');
const objectionSlug = require('objection-slug');
const BaseModel = require('./BaseModel');

// Create the slug mixin
const slug = objectionSlug({
  sourceField: 'name',
  slugField: 'slug'
});

class Company extends slug(BaseModel) {
  static get tableName() {
    return 'companies';
  }

  static get relationMappings() {
    return {
      jobs: {
        relation: BaseModel.HasManyRelation,
        modelClass: path.join(__dirname, 'Job'),
        join: {
          from: 'company.id',
          to: 'jobs.companyId'
        }
      }
    };
  }
}

module.exports = { Company };
