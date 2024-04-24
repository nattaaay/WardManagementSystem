const { Client } = require("pg");
//1 NEW INFORMATION --> mvc model? learn more about this later
// (model, view (FE), controller(function itself))

const client = new Client({
  user: "natashaishak",
  password: "123456",
  host: "localhost",
  port: "5432",
  database: "ward-management-system",
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

module.exports = client;
