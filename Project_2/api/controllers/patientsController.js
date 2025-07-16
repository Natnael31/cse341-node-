const { initDb, getClient } = require("../models/database");
const ObjectId = require('mongodb').ObjectId;
const patientsController = {};

patientsController.addPatient = async (req, res) => {

    try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let age = req.body.age;
        let gender = req.body.gender;
        let bloodTyoe = req.body.bloodType;
        let diagnosis = req.body.diagnosis;
        let insuranceDetails = req.body.insuranceDetails;

        const client = await getClient();
        const addPatient = await client.db("patients").collection("patients").insertOne({
            firstName,
            lastName,
            age,
            gender,
            bloodTyoe,
            diagnosis,
            insuranceDetails
        });
        res.status(201).json(addPatient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add patient", error: err.message });
    }
}

patientsController.getPatients = async (req, res) => {

    try {

        const client = await getClient();
        const allPatients = await client.db('patients').collection("patients");

        await allPatients.find().toArray().then((patients) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.json(patients);
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching patients", error: err.message });
    }

}

patientsController.getSinglePatient = async (req, res) => {
    try {
        const patientId = new ObjectId(req.params.id);
        console.log(patientId);
        const client = await getClient();
        const allPatients = await client.db("patients").collection("patients");

        await allPatients.find({ _id: patientId }).toArray().then((patients) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.json(patients[0]);
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching patient", error: err.message });
    }
}

patientsController.updatePatient = async (req, res) => {
    try {
        const patientId = new ObjectId(req.params.id);
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let age = req.body.age;
        let gender = req.body.gender;
        let bloodTyoe = req.body.bloodType;
        let diagnosis = req.body.diagnosis;
        let insuranceDetails = req.body.insuranceDetails;

        const client = await getClient();
        const allPatients = await client.db("patients").collection("patients");

        await allPatients.replaceOne({ _id: patientId }, {
            firstName,
            lastName,
            age,
            gender,
            bloodTyoe,
            diagnosis,
            insuranceDetails
        });
        res.setHeader("Content-Type", "application/json");
        res.status(204).json({ message: "Patient updated sucessfully!" });

    } catch (error) {

        res.status(500).json({ message: 'Error updating patient', error: err });
    }
}

patientsController.deletePatient = async (req, res) => {

    try {
        const patientId = new ObjectId(req.params.id);
        const client = await getClient();

        await client.db("patients").collection("patients").deleteOne({ _id: patientId });

        res.status(200).json({ message: "Patient deleted successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting patient", error: err.message })
    }
}


module.exports = patientsController;