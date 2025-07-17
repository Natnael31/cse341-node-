const { initDb, getClient } = require("../models/database");
const ObjectId = require('mongodb').ObjectId;
const doctorsController = {};

doctorsController.addDoctor = async (req, res) => {

    try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let phoneNumber = req.body.phoneNumber;
        let department = req.body.department;


        const client = await getClient();
        const addDoctor = await client.db("patients").collection("doctors").insertOne({
            firstName,
            lastName,
            email,
            phoneNumber,
            department
        });
        res.status(201).json(addDoctor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add doctor", error: err.message });
    }
}

doctorsController.getDoctors = async (req, res) => {

    try {

        const client = await getClient();
        const allDoctors = await client.db('patients').collection("doctors");

        await allDoctors.find().toArray().then((doctors) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.json(doctors);
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching doctors", error: err.message });
    }

}

doctorsController.getSingleDoctor = async (req, res) => {
    try {
        const doctorId = new ObjectId(req.params.id);
        console.log(doctorId);
        const client = await getClient();
        const allDoctors = await client.db("patients").collection("doctors");

        await allDoctors.find({ _id: doctorId }).toArray().then((doctors) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.json(doctors[0]);
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching doctor", error: err.message });
    }
}

doctorsController.updateDoctor = async (req, res) => {
    try {
        const doctorId = new ObjectId(req.params.id);
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let phoneNumber = req.body.phoneNumber;
        let department = req.body.department;

        const client = await getClient();
        const allDoctors = await client.db("patients").collection("doctors");

        await allDoctors.replaceOne({ _id: doctorId }, {
            firstName,
            lastName,
            email,
            phoneNumber,
            department
        });
        res.setHeader("Content-Type", "application/json");
        res.status(204).json({ message: "Doctor updated sucessfully!" });

    } catch (error) {

        res.status(500).json({ message: 'Error updating doctor', error: err });
    }
}

doctorsController.deleteDoctor = async (req, res) => {

    try {
        const doctorId = new ObjectId(req.params.id);
        const client = await getClient();

        await client.db("patients").collection("doctors").deleteOne({ _id: doctorId });

        res.status(200).json({ message: "Doctor deleted successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting doctor", error: err.message })
    }
}


module.exports = doctorsController;