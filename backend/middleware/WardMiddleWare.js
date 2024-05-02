require("dotenv").config();
//fetch all users from the 'employees' table in the db
const jwt = require("jsonwebtoken");
const client = require("../database");

const JWT_SECRET = process.env.JWT_SECRET;

const wardMiddleWare = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(400).json({ status: "error", msg: "Token not found" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  if (!token) {
    return res.status(403).json({ status: "error", msg: "missing token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && decoded.username) {
      const dbUser = await client.query(
        "SELECT username FROM public.employees WHERE username = $1",
        [decoded.username]
      );

      console.log(decoded.username, dbUser);

      if (dbUser.rows.length > 0) {
        req.decoded = decoded;
        next();
      } else {
        res.status(403).json({ status: "error", msg: "User not authorized" });
      }
    } else {
      res.status(500).send("Wrong credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  wardMiddleWare,
};
