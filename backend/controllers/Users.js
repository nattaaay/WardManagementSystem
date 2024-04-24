const client = require("../database");

//fetch all users from the 'employees' table in the db
const getUsers = async (req, res) => {
  try {
    const roles = await client.query(
      "SELECT username, employees_role, contact_number, id FROM public.employees;"
    );
    res
      .status(200)
      .send({ statusCode: 200, message: "Successful", data: roles.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//delete a user from the db
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await client.query("DELETE FROM public.employees WHERE id = $1", [userId]);
    res
      .status(200)
      .send({ statusCode: 200, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//updating a user's information
const updateUser = async (req, res) => {
  try {
    const { username, employees_role_id, contact_number, id } = req.body;

    await client.query(
      "UPDATE public.employees SET username = $1, employees_role = $2, contact_number = $3 WHERE id = $4",
      [username, employees_role_id, contact_number, id]
    );

    res
      .status(200)
      .send({ statusCode: 200, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUser,
};
