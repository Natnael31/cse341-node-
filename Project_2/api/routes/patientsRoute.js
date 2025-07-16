const router = require("express").Router();
const patientsController = require("../controllers/patientsController");
const validate = require("../utilities/patientValidator")

router.get("/", (req, res) => res.send("Hello Mongodb"));
router.get("/patients", patientsController.getPatients);
router.get("/patients/:id", patientsController.getSinglePatient);
router.post("/patients", validate.patientAddValidationRules(), validate.checkAddPatient, patientsController.addPatient);
router.put("/patients/:id", validate.patientupdateValidationRules(), validate.checkUpdatePatient, patientsController.updatePatient);
router.delete("/patients/:id", patientsController.deletePatient);

module.exports = router;