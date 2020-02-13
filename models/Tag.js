const path = require('path');
const { Model } = require('objection');

class Tag extends Model {
  static get tableName() {
    return 'tags';
  }

  static get relationMappings() {
    const Job = require('./Job');

    return {
      jobs: {
        relation: Model.ManyToManyRelation,
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
