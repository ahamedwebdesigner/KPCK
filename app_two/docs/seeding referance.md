// knexfile.js

development: {

  seeds: {
    directory: './data/seeds'
  }

}



knex seed:make user_seed







Seeding Your Database
Similar to migrations, the knex module allows us to create scripts to insert initial data into our tables called seed files! If we have relations on our tables, the seeding must be in a specific order to so that we can rely on data that might already be in the database. For example, we must seed the users table first because our tasks table must validate a user id foreign key that already exists.

Lets create some seed files in this order:

$ knex seed:make 01_users
$ knex seed:make 02_tasks
Now lets insert some data into our seed scripts:

Example 01_users.js

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        email: 'nigel@email.com',
        password: 'dorwssap'
      },
      {
        id: 2,
        email: 'nakaz@email.com',
        password: 'password1'
      },
      {
        id: 3
        email: 'jaywon@email.com',
        password: 'password123'
      }
    ]);
  });
};
Example 02_tasks.js

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
  .then(function () {
    // Inserts seed entries
    return knex('tasks').insert([
      {
        title: 'Vaccuum the floors',
        description: 'Vaccum the living room and all bedroom',
        is_complete: false,
        user_id: 2
      },
      {
        title: 'Clean the car',
        description: 'Wash, wax and vacuum the car',
        is_complete: false,
        user_id: 1,
      },
      {
        title: 'Buy groceries',
        description: 'Milk, bread, cheese, eggs, flour',
        is_complete: true,
        user_id: 3,
      }
    ]);
  });
};
Now we can run the below command in the root of our project to seed our database!

$ knex seed:run