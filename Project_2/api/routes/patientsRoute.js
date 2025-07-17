const router = require("express").Router();
const patientsController = require("../controllers/patientsController");
const doctorsController = require("../controllers/doctorsController");
const validate = require("../utilities/patientValidator")

router.get("/", (req, res) => res.send("Hello Mongodb"));
router.get("/patients", patientsController.getPatients);
router.get("/patients/:id", patientsController.getSinglePatient);
router.post("/patients", validate.patientAddValidationRules(), validate.checkAddPatient, patientsController.addPatient);
router.put("/patients/:id", validate.patientupdateValidationRules(), validate.checkUpdatePatient, patientsController.updatePatient);
router.delete("/patients/:id", patientsController.deletePatient);

router.get("/doctors", doctorsController.getDoctors);
router.get("/doctors/:id", doctorsController.getSingleDoctor);
router.post("/doctors", validate.doctorAddValidationRules(), validate.checkAddDoctor, doctorsController.addDoctor);
router.put("/doctors/:id", validate.doctorUpdateValidationRules(), validate.checkUpdateDoctor, doctorsController.updateDoctor);
router.delete("/doctors/:id", doctorsController.deleteDoctor);

module.exports = router;