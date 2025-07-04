const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const contactsRoute = require('./api/routes/contactsRoute');

const { initDb, getClient } = require('./api/models/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', contactsRoute);

const startServer = async () => {
    try {
        const client = await initDb();


        app.listen(port, () => {
            console.log(`Server running successfully on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
    }
};

startServer();
