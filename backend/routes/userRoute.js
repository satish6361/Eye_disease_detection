const express = require("express");

const {registerUser,loginUser, addPatient, patientList, addPrediction } = require("../controllers/userController")

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/user/addpatient").post(addPatient);
router.route("/user/patientlist").post(patientList);
router.route("/user/addprediction").put(addPrediction);

module.exports = router;