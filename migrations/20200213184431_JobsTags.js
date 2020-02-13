exports.up = knex => {
  return knex.schema.createTable('jobs_tags', table => {
    table.increments('id').primary();

    table
      .integer('jobId')
      .unsigned()
      .references('id')
      .inTable('jobs')
      .onDelete('CASCADE')
      .index();

    table
      .integer('tagId')
      .unsigned()
      .references('id')
      .inTable('tags')
      .onDelete('CASCADE')
      .index();
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('jobs_tags');
};
