//create routes

const express = require("express");
const { Login, Register, Roles } = require("../controllers/auth");
const { getUsers, deleteUser, updateUser } = require("../controllers/users");
const {
  fetchAllPatients,
  insertPatients,
  deletePatient,
  updatePatient,
  fetchAllWards,
  fetchPatientsWithWards,
} = require("../controllers/patientPersonalParticulars");
const {
  insertPatientsMedicalDetails,
  fetchAllMedicalHistory,
  deletePatientMedicalHistory,
} = require("../controllers/patientMedicalHistory");

const router = express.Router();

router.post("/login", Login);

router.post("/register", Register);

router.get("/roles", Roles);

router.get("/getUsers", getUsers);

router.delete("/deleteUser/:id", deleteUser);

router.post("/updateUser", updateUser);

router.get("/api/wmt/patientpp", fetchAllPatients);

router.get("/api/wmt/patientpp/wards/:wardNumber", fetchPatientsWithWards);

router.post("/api/wmt/patientpp", insertPatients);

router.post("/api/wmt/patient/discharge/pp/:id", deletePatient);

router.get("/api/wmt/patient/wards", fetchAllWards);

router.post("/api/wmt/patientpp/update", updatePatient);

router.get("/api/mt/patientpp", fetchAllMedicalHistory);

router.post("/api/mt/patientpp", insertPatientsMedicalDetails);

router.delete("/api/wmt/patientpp/:id", deletePatientMedicalHistory);

module.exports = router;
