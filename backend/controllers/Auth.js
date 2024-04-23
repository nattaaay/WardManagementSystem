const client = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "6IrQi6OEKps42Y34p9dH0rwqTP59h03P5sFBWk2U4kdsEOHBmibIjtcfxQZVZjTqa1CEMdCPZ4rFdJ50TqweKTYCbEO8HXTbyBfr";

const Register = async (req, res) => {
  try {
    const { username, password, contact_number, employees_role_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query(
      "INSERT INTO employees (username, password, contact_number, emplyees_role) VALUES ($1, $2, $3, $4)",
      [username, hashedPassword, contact_number, employees_role_id]
    );

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await client.query(
      "SELECT * FROM employees WHERE username = $1",
      [username]
    );

    if (user.rows.length === 0) {
      return res
        .status(400)
        .send({ statusCode: 400, message: "Invalid user name" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .send({ statusCode: 400, message: "Invalid Password" });
    }

    const token = jwt.sign({ username: user.rows[0].username }, JWT_SECRET);

    res.json({ statusCode:200, message:"Succsessful", token, user: user.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const Roles = async (req, res) => {
  try {
    const roles = await client.query("SELECT id, role FROM public.roles;");
    res
      .status(200)
      .send({ statusCode: 200, message: "Successful", data: roles.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  Login,
  Register,
  Roles,
};
