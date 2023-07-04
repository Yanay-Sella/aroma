const Pool = require("pg").Pool;
require("dotenv").config();

const dbPassword = process.env.POSTGRES_PASSWORD;

const pool = new Pool({
  user: "postgres",
  password: dbPassword,
  host: "localhost",
  port: "5432",
  database: "aromaDB",
});

module.exports = pool;
