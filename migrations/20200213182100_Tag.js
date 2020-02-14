exports.up = knex => {
  return knex.schema.createTable('tags', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('slug');
    table.timestamps(true, true);

    table.unique('name');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('tags');
};
