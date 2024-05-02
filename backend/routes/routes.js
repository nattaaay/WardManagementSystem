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
const { authAndFetchUsers } = require("../middleware/AdminMiddleWare");
const { medicalMiddleWare } = require("../middleware/MedicalMiddleWare");
const { wardMiddleWare } = require("../middleware/WardMiddleWare");

const router = express.Router();

router.post("/login", Login);

router.post("/register", authAndFetchUsers, Register);

//doubt not using
// router.get("/roles", Roles);

router.get("/getUsers", authAndFetchUsers, getUsers);

router.delete("/deleteUser/:id", authAndFetchUsers, deleteUser);

router.post("/updateUser", authAndFetchUsers, updateUser);

//doubt not using
// router.get("/api/wmt/patientpp", medicalMiddleWare, fetchAllPatients);

router.get(
  "/api/wmt/patientpp/wards/:wardNumber",
  medicalMiddleWare,
  fetchPatientsWithWards
);

router.post("/api/wmt/patientpp", medicalMiddleWare, insertPatients);

router.post(
  "/api/wmt/patient/discharge/pp/:id",
  medicalMiddleWare,
  deletePatient
);

// router.get("/api/wmt/patient/wards", fetchAllWards);

router.post("/api/wmt/patientpp/update", medicalMiddleWare, updatePatient);

router.get("/api/mt/patientpp", wardMiddleWare, fetchAllMedicalHistory);

router.post("/api/mt/patientpp", wardMiddleWare, insertPatientsMedicalDetails);

router.delete(
  "/api/wmt/patientpp/:id",
  wardMiddleWare,
  deletePatientMedicalHistory
);

module.exports = router;
