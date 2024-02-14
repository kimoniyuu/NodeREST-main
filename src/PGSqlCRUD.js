const express = require("express");
const Sequelize = require("sequelize");
const app = express();
// parse incoming requests
app.use(express.json());

// set db url
const dbUrl = '';

// create a connection to the database
const sequelize = new Sequelize(dbUrl);