const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { initDb } = require("./api/models/database");
const patientsRoute = require("./api/routes/patientsRoute");
require("dotenv").config;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

const app = express();
const port = process.env.PORT

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/", patientsRoute);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Hello");
    console.log("Hello")
});

// app.listen(port, (error) => {
//     console.log("Server running successfully!")
// })

const launchServer = async () => {
    try {
        const client = await initDb();
        client.connect();

        // await mongoose.connect(process.env.MONGOOSE_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // });

        // console.log("Mongod connected successfully!");

        app.listen(port, () => {
            console.log(`Server running successfully on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
    }
};

launchServer();