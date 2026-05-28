const mysql = require("mysql2/promise");

const dbConfig = require("../config/database");

let pool;

async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: "utf8mb4",
    });
  }

  return pool;
}

async function executeQuery(sql) {
  const finalSql = sql.trim();

  try {
    const currentPool = await getPool();

    const [rows] = await currentPool.query({
      sql: finalSql,
      timeout: 10000,
    });

    return rows;
  } catch (error) {
    console.error("MYSQL ERROR:", error);

    pool = null;

    throw error;
  }
}

module.exports = {
  executeQuery,
};
