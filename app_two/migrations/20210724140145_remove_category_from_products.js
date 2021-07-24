

exports.up = function(knex) {
    return knex.schema.table('products', function(t) {
        t.dropColumn('category');
    });
};

exports.down = function(knex) {
    return knex.schema.table('products', function(t) {
        t.enum('category', ['apparel', 'electronics', 'furniture']).notNull();
    });
};
