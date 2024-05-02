const { Client } = require("pg");
//1
// NEW INFORMATION --> mvc model? learn more about this later (model, view (FE), controller(function itself))
require("dotenv").config();

// create a postgres db client
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
