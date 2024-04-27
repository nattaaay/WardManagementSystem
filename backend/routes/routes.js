const express = require("express");
const { Login, Register, Roles } = require("../controllers/auth");
const { getUsers, deleteUser, updateUser } = require("../controllers/Users");
const {
  fetchAllPatients,
  insertPatients,
  deletePatient,
  updatePatient,
} = require("../controllers/patientPersonalParticulars");
const {
  insertPatientsMedicalDetails,
  fetchAllMedicalHostory,
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

router.post("/api/wmt/patientpp", insertPatients);

router.delete("/api/wmt/patientpp/:id", deletePatient);

router.put("/api/wmt/patientpp", updatePatient);

router.get("/api/mt/patientpp", fetchAllMedicalHostory);

router.post("/api/mt/patientpp", insertPatientsMedicalDetails);

router.delete("/api/wmt/patientpp/:id", deletePatientMedicalHistory);

module.exports = router;
