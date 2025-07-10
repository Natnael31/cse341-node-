const { initDb, getClient } = require('../models/database');
const ObjectId = require('mongodb').ObjectId;
const Contact = require('../models/contactsModel');

const contactsController = {}

contactsController.addContact = async (req, res) => {

    try {

        //  // Using Mongoose 'contact' schema

        // const newContact = new Contact({
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     email: req.body.email,
        //     favoriteColor: req.body.favoriteColor,
        //     birthDate: req.body.birthDate
        // });

        // const addContact = await newContact.save();
        // res.status(201).json(addContact);


        //  // Using native mongodb and raw json data as a whole
        // const newContact = req.body;
        // console.log(newContact);
        // const client = await getClient();
        // const addContact = await client.db("contacts").collection("contacts").insertOne(newContact);
        // res.status(201).json(addContact);

        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let favoriteColor = req.body.favoriteColor;
        let birthDate = req.body.birthDate;

        const client = await getClient();
        const addContact = await client.db("contacts").collection("contacts").insertOne({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthDate: new Date(birthDate)
        });
        res.status(201).json(addContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add contact", error: err.message });
    }
}

contactsController.getContacts = async (req, res) => {
    try {
        const client = await getClient();
        const allContacts = await client.db("contacts").collection("contacts");

        await allContacts.find().toArray().then((contacts) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.json(contacts);
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching contacts", error: err.message });
    }
}

contactsController.getSingleContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        console.log(contactId);
        const client = await getClient();
        const allContacts = await client.db("contacts").collection("contacts");

        await allContacts.find({ _id: contactId }).toArray().then((contacts) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.json(contacts[0]);
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching contact", error: err.message });
    }
}

contactsController.updateContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let favoriteColor = req.body.favoriteColor;
        let birthDate = req.body.birthDate;
        const client = await getClient();
        const allContacts = await client.db("contacts").collection("contacts");

        await allContacts.replaceOne({ _id: contactId }, {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthDate: new Date(birthDate)
        });
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "Contact updated sucessfully!" });

    } catch (error) {

        res.status(500).json({ message: 'Error updating contact', error: err });
    }
}

contactsController.deleteContact = async (req, res) => {

    try {
        const contactId = new ObjectId(req.params.id);
        const client = await getClient();

        await client.db("contacts").collection("contacts").deleteOne({ _id: contactId });

        res.status(200).json({ message: "Contact deleted successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting contact", error: err.message })
    }
}

module.exports = contactsController;