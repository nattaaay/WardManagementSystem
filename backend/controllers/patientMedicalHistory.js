const client = require("../database");

const fetchAllMedicalHistory = async (req, res) => {
  try {
    const roles = await client.query(
      `SELECT * FROM public."patients-medical-details" ORDER BY id ASC`
    );
    res
      .status(200)
      .send({ statusCode: 200, message: "Successful", data: roles.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const insertPatientsMedicalDetails = async (req, res) => {
  try {
    const {
      patient_medical_name,
      medical_history,
      medical_notes,
      treatment_plans,
      ic_number,
    } = req.body;
    await client.query(
      `INSERT INTO public."patients-medical-details" (patient_medical_name, medical_history, medical_notes, treatment_plans, ic_number) VALUES ($1, $2, $3, $4, $5)`,
      [
        patient_medical_name,
        medical_history,
        medical_notes,
        treatment_plans,
        ic_number,
      ]
    );
    res.status(201).send({ statusCode: 200, message: "Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deletePatientMedicalHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await client.query(
      `DELETE FROM public."patients-medical-details" WHERE id = $1`,
      [id]
    );
    res.status(200).send({ statusCode: 200, message: "Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updatePatientMedicalHistory = async (req, res) => {
  try {
    const {
      id,
      patient_medical_name,
      medical_history,
      medical_notes,
      treatment_plans,
      ic_number,
    } = req.body;
    await client.query(
      `UPDATE public."patients-medical-details" SET id = $1, patient_medical_name = $2, medical_history = $3, treatment_plans = $4, ic_number = $5`,
      [
        id,
        patient_medical_name,
        medical_history,
        medical_notes,
        treatment_plans,
        ic_number,
      ]
    );
    res.status(200).send({ statusCode: 200, message: "Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  fetchAllMedicalHistory,
  insertPatientsMedicalDetails,
  deletePatientMedicalHistory,
  updatePatientMedicalHistory,
};
