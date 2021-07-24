# app_Two: ORM applicatio 

## 1)
express --view=ejs

## 2) 
npm install


npm install -g knex 


npm install knex bookshelf mysql


## 5

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# working with migrations

## 1)
npm install -g knex

knex migrate:latest --help

knex init

knex migrate:latest
knex migrate:latest --env production

knex migrate:up
knex migrate:up 20210724135530_add_quantity_to_products.js  

knex migrate:rollback
knex migrate:rollback --all



knex migrate:make create_products
knex migrate:make add_quantity_to_products
knex migrate:make remove_category_from_products
knex migrate:make index_product_price


