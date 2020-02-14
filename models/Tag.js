const path = require('path');
const objectionSlug = require('objection-slug');
const BaseModel = require('./BaseModel');

// Create the slug mixin
const slug = objectionSlug({
  sourceField: 'name',
  slugField: 'slug'
});

class Tag extends slug(BaseModel) {
  static get tableName() {
    return 'tags';
  }

  static get relationMappings() {
    return {
      jobs: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: path.join(__dirname, 'Job'),
        join: {
          from: 'tags.id',
          through: {
            from: 'jobs_tags.jobId',
            to: 'jobs_tags.tagId'
          },
          to: 'jobs.id'
        }
      }
    };
  }
}

module.exports = { Tag };
