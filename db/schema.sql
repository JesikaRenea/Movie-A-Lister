
DROP DATABASE IF EXISTS movies_db

CREATE DATABASE movies_db;

USE movies_db;

CREATE TABLE movies (
id INT NOT NULL auto_increment,
poster VARCHAR (300),
title VARCHAR (300) NOT NULL,
releaseDate VARCHAR (140),
rating VARCHAR (40),
genre VARCHAR (120),
favorite BOOLEAN DEFAULT false,
wantToWatch BOOLEAN DEFAULT false,
createdAt TIMESTAMP NOT NULL,
updatedAt TIMESTAMP,
PRIMARY KEY(id)
);

CREATE TABLE users (
id INT NOT NULL auto_increment,
email VARCHAR (300),
password VARCHAR (300) NOT NULL,
createdAt TIMESTAMP NOT NULL,
updatedAt TIMESTAMP,
PRIMARY KEY(id)
);
