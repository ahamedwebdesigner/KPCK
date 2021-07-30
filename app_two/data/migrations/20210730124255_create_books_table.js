
exports.up = function(knex) {
    return knex.schema.createTable('books', function(t) {
        t.increments().primary()
        t.string('title', 255).notNullable()
        t.string('description', 255).notNullable(),
        t.integer('authorId',11).unsigned().notNullable();  
        t.foreign('authorId').references('id').inTable('authors');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
