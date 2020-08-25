require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": process.env.DATABASE_URL,
  //Ternary condition that checks the NODE_ENV and either uses DATABASE_URL or TEST_DATABASE_URL
  "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
}