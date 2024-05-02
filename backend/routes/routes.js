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
const { authAndFetchUsers } = require("../middleware/adminMiddleware");
const { medicalMiddleware } = require("../middleware/medicalMiddleware");
const { wardMiddleware } = require("../middleware/wardMiddleware");

const router = express.Router();

router.post("/login", Login);

router.post("/register", authAndFetchUsers, Register);

router.get("/getUsers", authAndFetchUsers, getUsers);

router.delete("/deleteUser/:id", authAndFetchUsers, deleteUser);

router.post("/updateUser", authAndFetchUsers, updateUser);

router.get(
  "/api/wmt/patientpp/wards/:wardNumber",
  medicalMiddleware,
  fetchPatientsWithWards
);

router.post("/api/wmt/patientpp", medicalMiddleware, insertPatients);

router.post(
  "/api/wmt/patient/discharge/pp/:id",
  medicalMiddleware,
  deletePatient
);

router.post("/api/wmt/patientpp/update", medicalMiddleware, updatePatient);

router.get("/api/mt/patientpp", wardMiddleware, fetchAllMedicalHistory);

router.post("/api/mt/patientpp", wardMiddleware, insertPatientsMedicalDetails);

router.delete(
  "/api/wmt/patientpp/:id",
  wardMiddleware,
  deletePatientMedicalHistory
);

module.exports = router;
