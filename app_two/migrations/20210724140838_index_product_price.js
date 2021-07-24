exports.up = function(knex) {
    return knex.schema.table('products', function(t) {
        t.index([ 'price' ]);
    });
};

exports.down = function(knex) {
    return knex.schema.table('products', function(t) {
        t.dropIndex([ 'price' ]);
    });
};

