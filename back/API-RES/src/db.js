const { createPool } = require("mysql2/promise");
exports.pool = createPool({
  host: "localhost",
  user: "root",
  password: "Pregrado2020}",
  port: 3306,
  database: "awie",
});