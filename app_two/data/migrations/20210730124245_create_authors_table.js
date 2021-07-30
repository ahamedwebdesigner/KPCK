exports.up = function(knex) {
    return knex.schema
    .dropTableIfExists('authors')
    .createTable('authors', function(t) {
        t.increments('authorId').primary();
   
        t.string('authorName', 255).notNullable()
        t.string('email', 255).notNullable()
        t.string('password', 255).notNullable()
        t.boolean('account_verified').notNullable().defaultTo(false)
        
         t.timestamp('created_at').defaultTo(knex.fn.now())
         t.timestamp('updated_at').defaultTo(knex.fn.now())

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('authors');
};
