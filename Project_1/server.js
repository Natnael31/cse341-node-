const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const contactsRoute = require('./api/routes/contactsRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { initDb, getClient } = require('./api/models/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Routes
app.use('/', contactsRoute);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

const launchServer = async () => {
    try {
        const client = await initDb();

        await mongoose.connect(process.env.MONGOOSE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Mongoose connected successfully!");

        app.listen(port, () => {
            console.log(`Server running successfully on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
    }
};

launchServer();
