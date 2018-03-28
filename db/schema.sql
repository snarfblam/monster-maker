DROP DATABASE IF EXISTS monsters_db;
CREATE DATABASE monsters_db;
USE monsters_db;

CREATE TABLE IF NOT EXISTS `monsters` (
    id INTEGER AUTO_INCREMENT,
    partyId INTEGER NOT NULL,
    body INTEGER NOT NULL,
    head INTEGER NOT NULL,
    eyes INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS `parties` (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    habitat INTEGER NOT NULL,
    PRIMARY KEY(id)
);