/*
InnoDB : The default storage engine in MySQL 8.0. ...
MyISAM : These tables have a small footprint. ...
Memory : Stores all data in RAM, for fast access in environments that require quick lookups of non-critical data. ...
CSV : Its tables are really text files with comma-separated values.

*/


CREATE DATABASE /*!32312 IF NOT EXISTS*/`classicmodels` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `classicmodels`;


DROP TABLE IF EXISTS `offices`;

CREATE TABLE `offices` (
  `officeCode` varchar(10) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `postalCode` varchar(15) NOT NULL,
  `territory` varchar(10) NOT NULL,
  PRIMARY KEY (`officeCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;






DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `employeeNumber` int(11) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `officeCode` varchar(10) NOT NULL,
  `reportsTo` int(11) DEFAULT NULL,
  `jobTitle` varchar(50) NOT NULL,
  PRIMARY KEY (`employeeNumber`),
  KEY `reportsTo` (`reportsTo`),
  KEY `officeCode` (`officeCode`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`reportsTo`) REFERENCES `employees` (`employeeNumber`),
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`officeCode`) REFERENCES `offices` (`officeCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;





DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `customerNumber` int(11) NOT NULL,
  `customerName` varchar(50) NOT NULL,
  `contactLastName` varchar(50) NOT NULL,
  `contactFirstName` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `salesRepEmployeeNumber` int(11) DEFAULT NULL,

  `creditLimit` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`customerNumber`),
  KEY `salesRepEmployeeNumber` (`salesRepEmployeeNumber`),
 
 CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`salesRepEmployeeNumber`) REFERENCES `employees` (`employeeNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;









insert  into `offices`(`officeCode`,`city`,`phone`,`addressLine1`,`addressLine2`,`state`,`country`,`postalCode`,`territory`) 
values ('1','San Francisco','+1 650 219 4782','100 Market Street','Suite 300','CA','USA','94080','NA');

insert  into `employees`(`employeeNumber`,`lastName`,`firstName`,`extension`,`email`,`officeCode`,`reportsTo`,`jobTitle`) 
values(1002,'Murphy','Diane','x5800','dmurphy@classicmodelcars.com','1',NULL,'President');

insert  into `customers`(
	`customerNumber`,`customerName`,`contactLastName`,`contactFirstName`,
    `phone`,`addressLine1`,`addressLine2`,`city`,`state`,`postalCode`,`country`,
    `salesRepEmployeeNumber`,`creditLimit`) values 
						(
	103,'Atelier graphique','Schmitt','Carine ',
	'40.32.2555','54, rue Royale',NULL,'Nantes',NULL,'44000','France',
    1002,'21000.00');



#------------------------------------------------------------------
SELECT 
     lastName as Fname, firstname as Sname
FROM
    employees;
    
SELECT 
    CONCAT_WS('-', lastName, firstname) as name
FROM
    employees;
    
    
    
    
SELECT 
  customerName as `Customer Name`,
  employees.lastName as `Sale repo `
FROM
    customers
INNER JOIN employees
	ON  customers.salesRepEmployeeNumber = employees.employeeNumber 
where employees.firstName ='Diane';

#-------------------


SELECT 
	offices.city ,
    customers.city
FROM offices
INNER JOIN employees
	ON  offices.officeCode =employees.officeCode
inner join customers
	ON customers.salesRepEmployeeNumber = employees.employeeNumber
where  customers.customerNumber = 103;


#-------------------
SELECT 
	t1.city as `Rep., Offiece`,
    t3.city as `cusomer Offiece`
FROM offices as t1
INNER JOIN employees as t2
	ON  t1.officeCode =t2.officeCode
inner join customers as t3
	ON t3.salesRepEmployeeNumber = t2.employeeNumber
where  t3.customerNumber = 103;

