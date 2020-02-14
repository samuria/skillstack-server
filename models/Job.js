'use strict';
const path = require('path');
const objectionSlug = require('objection-slug');
const BaseModel = require('./BaseModel');
const Company = require('./Company');

// Create the slug mixin
const slug = objectionSlug({
  sourceField: 'position',
  slugField: 'slug'
});

class Job extends slug(BaseModel) {
  // Table name is the only required property.
  static get tableName() {
    return 'jobs';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      tags: {
        relation: BaseModel.ManyToManyRelation,
        // The related model. This can either be a Model subclass or an
        // absolute file path to a module that exports one.
        modelClass: path.join(__dirname, 'Tag'),
        join: {
          from: 'jobs.id',
          // ManyToMany relation needs the `through` object to describe the join table.
          through: {
            from: 'jobs_tags.jobId',
            to: 'jobs_tags.tagId'
          },
          to: 'tags.id'
        }
      },
      company: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'Company'),
        join: {
          from: 'jobs.companyId',
          to: 'companies.id'
        }
      }
    };
  }
}

module.exports = {
  Job
};
