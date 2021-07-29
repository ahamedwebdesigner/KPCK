
exports.up = function(knex) {
    return knex.schema.createTable('users', function(t) {
        t.increments('id').unsigned().primary();
    

        t.string('username').notNull();
        t.string('email').nullable();
        t.string('name').nullable();
        t.integer('age').nullable();
        t.string('location').nullable();
        t.enum('role', ['admin', 'reguser', 'superadmin','user']).defaultTo('user');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');

};
