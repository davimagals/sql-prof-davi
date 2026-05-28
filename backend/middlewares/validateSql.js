function validateSql(req, res, next) {
  const { sql } = req.body;

  if (!sql || typeof sql !== "string") {
    return res.status(400).json({
      error: "Invalid SQL query.",
    });
  }

  const normalizedSql = sql.trim().toUpperCase();

  const forbiddenKeywords = [
    "DELETE",
    "DROP",
    "ALTER",
    "TRUNCATE",
    "CREATE",
    "REPLACE",
    "GRANT",
    "REVOKE",
  ];

  for (const keyword of forbiddenKeywords) {
    if (normalizedSql.includes(keyword)) {
      return res.status(403).json({
        error: `Keyword not allowed: ${keyword}`,
      });
    }
  }

  const semicolonCount = (sql.match(/;/g) || []).length;

  if (semicolonCount > 1) {
    return res.status(403).json({
      error: "Multiple SQL statements are not allowed.",
    });
  }

  next();
}

module.exports = validateSql;
