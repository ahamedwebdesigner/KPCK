CREATE USER 'apptwo'@'localhost' IDENTIFIED VIA mysql_native_password USING '***';
GRANT ALL PRIVILEGES ON *.* TO 'apptwo'@'localhost' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
CREATE DATABASE IF NOT EXISTS `apptwo`;GRANT ALL PRIVILEGES ON `apptwo`.* TO 'apptwo'@'localhost';GRANT ALL PRIVILEGES ON `apptwo\_%`.* TO 'apptwo'@'localhost';