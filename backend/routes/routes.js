//3 - creating routes
const express = require("express");
const { Login, Register, Roles } = require("../controllers/Auth");
const { getUsers, deleteUser, updateUser } = require("../controllers/Users");

const router = express.Router();

router.post("/login", Login);

router.post("/register", Register);

router.get("/roles", Roles);

router.get("/getUsers", getUsers);

router.delete("/deleteUser/:id", deleteUser);

router.post("/updateUser", updateUser);
//why though? why not patch eh?
//why DOESN'T patch work?
// is it the endpoint? i dont know!!!
module.exports = router;
