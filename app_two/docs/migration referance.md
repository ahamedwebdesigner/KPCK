
# working with migrations

## 1) install Knex globally
npm install -g knex

## 2) to get the helf for any command
knex migrate:latest --help

## 3) initiate knex in you project 
creates knexfile.js whcih contain migration configurations

knex init

## 4) to run latest migrations
knex migrate:latest
knex migrate:latest --env production

## 5) To nun migrations which are not runned yet
knex migrate:up

## 6 to run specific migration
knex migrate:up 20210724135530_add_quantity_to_products.js  

## 7 to undou last migration
knex migrate:down
knex migrate:down <<001_migration_name.js>>


## 8 to roll back migrations
knex migrate:rollback
knex migrate:rollback --all

## list of all the migrations both pending and compleated

knex migrate:list


knex migrate:make create_products
knex migrate:make add_quantity_to_products
knex migrate:make remove_category_from_products
knex migrate:make index_product_price

