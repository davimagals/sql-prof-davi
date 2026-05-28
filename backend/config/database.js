module.exports = {
  host: process.env.MYSQL_HOST || "mysql",
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || "aluno",
  password: process.env.MYSQL_PASSWORD || "aluno",
  database: process.env.MYSQL_DATABASE || "sakila",
};
