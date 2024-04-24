//4
//writing the logic that we are using the db here, import to the routes
const client = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "6IrQi6OEKps42Y34p9dH0rwqTP59h03P5sFBWk2U4kdsEOHBmibIjtcfxQZVZjTqa1CEMdCPZ4rFdJ50TqweKTYCbEO8HXTbyBfr";

//handle user registration
const Register = async (req, res) => {
  try {
    const { username, password, contact_number, employees_role_id } = req.body;

    //generating a hashed password using the bcrypt library
    const hashedPassword = await bcrypt.hash(password, 10);

    //insert a new user into the 'employees' table in the db
    await client.query(
      "INSERT INTO employees (username, password, contact_number, employees_role) VALUES ($1, $2, $3, $4)",
      [username, hashedPassword, contact_number, employees_role_id]
    );

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

//handle user login
const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //query the db to check if the user exists
    const user = await client.query(
      "SELECT * FROM employees WHERE username = $1",
      [username]
    );

    if (user.rows.length === 0) {
      return res
        .status(400)
        .send({ statusCode: 400, message: "Invalid user name" });
    }

    // comparing the provided password with the hashed password in the db
    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .send({ statusCode: 400, message: "Invalid Password" });
    }

    //generating a JWT with the 'username' of the logged-in user
    const token = jwt.sign({ username: user.rows[0].username }, JWT_SECRET);

    res.json({
      statusCode: 200,
      message: "Succsessful",
      token,
      user: user.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

//fetch all roles from the 'roles' table in the db
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
