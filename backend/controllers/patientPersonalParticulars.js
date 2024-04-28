const client = require("../database");

const fetchAllPatients = async (req, res) => {
  try {
    const roles = await client.query(
      `SELECT pp.id, 
      pp.patient_name, 
      pp.contact_number, 
      pp.admission_date, 
      pp.discharge_date, 
      pp.ic_number, 
      pp.ward_number, 
      pp.bed_number,
      md.*
      FROM public."patient-personal-particulars" AS pp
      JOIN public."patients-medical-details" AS md
      ON pp.ic_number = md.ic_number;`
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
      patient_name,
      ic_number,
      contact_number,
      ward_number,
      bed_number,
      admission_date,
      discharge_date,
      medical_history,
      medical_notes,
      treatment_plans,
    } = req.body;
    const patientDischargeDefault = false;
    await client.query(
      `INSERT INTO public."patient-personal-particulars" (patient_name, ic_number, contact_number, ward_number, bed_number, admission_date, discharge_date, discharge_patient) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        patient_name,
        ic_number,
        contact_number,
        ward_number,
        bed_number,
        admission_date,
        discharge_date,
        patientDischargeDefault,
      ]
    );
    await client.query(
      `INSERT INTO public."patients-medical-details" (patient_medical_name, medical_history, medical_notes, treatment_plans, ic_number) VALUES ($1, $2, $3, $4, $5)`,
      [patient_name, medical_history, medical_notes, treatment_plans, ic_number]
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
      `UPDATE public."patient-personal-particulars" 
       SET discharge_patient = 'true'
       WHERE id = $1`,
      [id]
    );
    res.status(200).send({
      statusCode: 200,
      message: "Discharge date updated successfully",
    });
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
      `UPDATE public."patient-personal-particulars" SET name = $1, ic_number = $2, contact_number = $3, ward_number = $4, bed_number = $5, admission_date = $6, discharge_date = $7 WHERE id = $8`,
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
