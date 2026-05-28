const mysql = require("mysql2/promise");

const dbConfig = require("../config/database");

console.log("DB CONFIG:", dbConfig);

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function executeQuery(sql) {
  let finalSql = sql.trim();

  const [rows] = await pool.query({
    sql: finalSql,
    timeout: 10000,
  });

  return rows;
}

module.exports = {
  executeQuery,
};
