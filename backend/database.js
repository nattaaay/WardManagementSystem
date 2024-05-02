const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: "natashaishak",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: "5432",
  database: "ward-management-system",
});

const testFunction = async () => {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
  } catch (err) {
    console.error("Error connecting to PostgreSQL database", err);
  }
};

testFunction();

module.exports = client;
