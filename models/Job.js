'use strict';
const path = require('path');
const objectionSlug = require('objection-slug');
const { Model } = require('objection');

// Create the slug mixin
const slug = objectionSlug({
  sourceField: 'position',
  slugField: 'slug'
});

class Job extends slug(Model) {
  // Table name is the only required property.
  static get tableName() {
    return 'jobs';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    // One way to prevent circular references
    // is to require the model classes here
    const Tag = require('./Tag');

    return {
      tags: {
        relation: Model.ManyToManyRelation,
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
      }
    };
  }
}

module.exports = {
  Job
};
