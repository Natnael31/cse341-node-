const { initDb, getClient } = require('../models/database');
const ObjectId = require('mongodb').ObjectId;
const Contact = require('../models/contactsModel');

const contactsController = {}

contactsController.addContact = async (req, res) => {

    try {
        const newContact = new Contact({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthDate: req.body.birthDate
        });

        const addContact = await newContact.save();

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

        allContacts.find().toArray().then((contacts) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.json(contacts);
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch contacts", error: err.message });
    }
}

contactsController.getSingleContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        console.log(contactId);
        const client = await getClient();
        const allContacts = await client.db("contacts").collection("contacts");

        allContacts.find({ _id: contactId }).toArray().then((contacts) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.json(contacts[0]);
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch contacts", error: err.message });
    }
}

module.exports = contactsController;