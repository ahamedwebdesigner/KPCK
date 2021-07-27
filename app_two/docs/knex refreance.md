# step1: 
express --view=ejs

# 2
npm install

# 3
npm install -g knex              # Install Knex globally


npm install knex
npm install bookshelf

# Then add one of the following:
$ npm install pg
$ npm install mysql
$ npm install sqlite3


# migrations
https://knexjs.org/#Migrations-CLI

knex migrate:latest --help

  knex init
 
  knex migrate:latest


  knex migrate:make create_products
  knex migrate:make add_quantity_to_products


https://knexjs.org/#Migrations-CLI
