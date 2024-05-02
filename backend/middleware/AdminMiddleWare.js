require("dotenv").config();
//fetch all users from the 'employees' table in the db
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authAndFetchUsers = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(400).json({ status: "error", msg: "Token not found" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  if (!token) {
    return res.status(403).json({ status: "error", msg: "missing token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    if (decoded && decoded.id == "8") {
      req.decoded = decoded;
      next();
    } else {
      res.status(500).send("Wrong credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  authAndFetchUsers,
};
