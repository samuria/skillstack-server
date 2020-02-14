exports.up = knex => {
  return knex.schema.createTable('jobs', table => {
    table.increments('id').primary();

    table
      .integer('jobId')
      .unsigned()
      .references('id')
      .inTable('jobs')
      .onDelete('SET NULL')
      .index();

    table.string('slug');
    table.string('email');
    table.string('position');
    table.string('description');
    table.string('location');
    table.string('type');
    table.string('apply_url');
    table.string('apply_email');
    table.integer('companyId');
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('jobs');
};
