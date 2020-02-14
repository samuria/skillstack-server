exports.up = knex => {
  return knex.schema.createTable('companies', table => {
    table.increments('id').primary();

    table.string('name');
    table.string('slug');
    table.string('logo');
    table.string('website');
    table.string('twitter');
    table.string('linkedin');

    table.unique('name');

    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('companies');
};
