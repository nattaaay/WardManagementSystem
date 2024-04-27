const client = require("../database");

const fetchAllPatients = async (req, res) => {
  try {
    const roles = await client.query(
      `SELECT * FROM public."patients-personal-particulars" ORDER BY id ASC`
    );
    res
      .status(200)
      .send({ statusCode: 200, message: "Successful", data: roles.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const insertPatients = async (req, res) => {
  try {
    const {
      name,
      ic_number,
      contact_number,
      ward_number,
      bed_number,
      admission_date,
      discharge_date,
    } = req.body;
    await client.query(
      `INSERT INTO public."patients-personal-particulars" (patient_name, ic_number, contact_number, ward_number, bed_number, admission_date, discharge_date) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        name,
        ic_number,
        contact_number,
        ward_number,
        bed_number,
        admission_date,
        discharge_date,
      ]
    );
    res.status(201).send({ statusCode: 200, message: "Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await client.query(
      `DELETE FROM public."patients-personal-particulars" WHERE id = $1`,
      [id]
    );
    res.status(200).send({ statusCode: 200, message: "Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updatePatient = async (req, res) => {
  try {
    const {
      id,
      name,
      ic_number,
      contact_number,
      ward_number,
      bed_number,
      admission_date,
      discharge_date,
    } = req.body;
    await client.query(
      `UPDATE public."patients-personal-particulars" SET name = $1, ic_number = $2, contact_number = $3, ward_number = $4, bed_number = $5, admission_date = $6, discharge_date = $7 WHERE id = $8`,
      [
        name,
        ic_number,
        contact_number,
        ward_number,
        bed_number,
        admission_date,
        discharge_date,
        id,
      ]
    );
    res.status(200).send({ statusCode: 200, message: "Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  insertPatients,
  fetchAllPatients,
  deletePatient,
  updatePatient,
};
