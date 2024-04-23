const express = require("express");
const { Login, Register, Roles } = require("../controllers/Auth");

const router = express.Router();

router.post("/login", Login);

router.post("/register", Register);

router.get("/roles", Roles);

module.exports = router;
