/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
require("dotenv").config();

const {createPool} = require("mysql2/promise");

exports.db = createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
});
