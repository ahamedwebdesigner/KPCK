
exports.up = function(knex) {
    return knex.schema.table('products', function(t) {
        t.integer('quantity').notNull().defaultTo(0);
    });
};

exports.down = function(knex) {
    return knex.schema.table('products', function(t) {
        t.dropColumn('quantity');
    });
};
