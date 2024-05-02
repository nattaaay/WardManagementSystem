const client = require("../database");

//fetch all patient records
//join two tables (patient personal particulars & patient medical details)
//return an array of objects
const fetchAllPatients = async (req, res) => {
  try {
    const roles = await client.query(
      `SELECT pp.id, 
      pp.patient_name, 
      pp.discharge_patient,
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

const fetchPatientsWithWards = async (req, res) => {
  try {
    const { wardNumber } = req.params; // Assuming ward number is passed as a parameter
    const roles = await client.query(
      //most difficult query. joining two tables. pp.id and md.uuid
      `SELECT pp.id, 
      pp.patient_name, 
      pp.contact_number, 
      pp.discharge_patient,
      pp.admission_date, 
      pp.discharge_date,  
      pp.ic_number, 
      pp.ward_number, 
      pp.bed_number,
      md.*
      FROM public."patient-personal-particulars" AS pp
      JOIN public."patients-medical-details" AS md
      ON pp.id = md.uuid
      WHERE pp.ward_number = $1;`,
      [wardNumber] // Using parameterized query to prevent SQL injection
    );
    res
      .status(200)
      .send({ statusCode: 200, message: "Successful", data: roles.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const insertPatients = async (req, res) => {
//   try {
//     const {
//       patient_name,
//       ic_number,
//       contact_number,
//       ward_number,
//       bed_number,
//       admission_date,
//       discharge_date,
//       medical_history,
//       medical_notes,
//       treatment_plans,
//     } = req.body;
//     const patientDischargeDefault = "false";
//     await client.query(
//       //first query
//       `INSERT INTO public."patient-personal-particulars" (patient_name, ic_number, contact_number, ward_number, bed_number, admission_date, discharge_date, discharge_patient) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
//       [
//         patient_name,
//         ic_number,
//         contact_number,
//         ward_number,
//         bed_number,
//         admission_date,
//         discharge_date,
//         patientDischargeDefault,
//       ]
//     );
//     await client.query(
//       //second query
//       `INSERT INTO public."patients-medical-details" (patient_medical_name, medical_history, medical_notes, treatment_plans, ic_number) VALUES ($1, $2, $3, $4, $5)`,
//       [patient_name, medical_history, medical_notes, treatment_plans, ic_number]
//     );

//     res.status(201).send({ statusCode: 200, message: "Successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };

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
    const patientDischargeDefault = "active";

    const patientPersonalResult = await client.query(
      `INSERT INTO public."patient-personal-particulars" (patient_name, ic_number, contact_number, ward_number, bed_number, admission_date, discharge_date, discharge_patient) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
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

    const patientId = patientPersonalResult.rows[0].id;

    await client.query(
      `INSERT INTO public."patients-medical-details" (patient_medical_name, medical_history, medical_notes, treatment_plans, uuid, ic_number) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        patient_name,
        medical_history,
        medical_notes,
        treatment_plans,
        patientId,
        ic_number,
      ]
    );

    res.status(201).send({ statusCode: 200, message: "Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

//"delete" patient. change the discharge_patient to true
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await client.query(
      `UPDATE public."patient-personal-particulars" 
       SET discharge_patient = 'discharge'
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

const fetchAllWards = async (req, res) => {
  try {
    const wards = await client.query(
      `SELECT id, 
      ward_number
      FROM public."patient-personal-particulars"`
    );
    res
      .status(200)
      .send({ statusCode: 200, message: "Successful", data: wards.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updatePatient = async (req, res) => {
  try {
    const {
      id,
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

    // Check if the patient exists
    const patientExists = await client.query(
      `SELECT * FROM public."patient-personal-particulars" WHERE id = $1`,
      [id]
    );

    if (patientExists.rows.length === 0) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Patient not found" });
    }

    await client.query(
      `UPDATE public."patient-personal-particulars" 
       SET patient_name = $1, 
           contact_number = $2, 
           ward_number = $3, 
           bed_number = $4, 
           admission_date = $5, 
           discharge_date = $6 ,
           ic_number = $7
       WHERE id = $8`,
      [
        patient_name,
        contact_number,
        ward_number,
        bed_number,
        admission_date,
        discharge_date,
        ic_number,
        id,
      ]
    );

    await client.query(
      `UPDATE public."patients-medical-details" 
       SET patient_medical_name = $1, 
           medical_history = $2, 
           medical_notes = $3, 
           treatment_plans = $4 
       WHERE uuid = $5`,
      [patient_name, medical_history, medical_notes, treatment_plans, id]
    );

    res.status(200).send({
      statusCode: 200,
      message: "Patient record updated successfully",
    });
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
  fetchAllWards,
  fetchPatientsWithWards,
};
