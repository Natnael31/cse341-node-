const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const { initDb } = require("./api/models/database");
const authRoutes = require("./api/routes/authRoutes");
const patientsRoute = require("./api/routes/patientsRoute");
const { configureOAuth, authenticate } = require("./api/controllers/authController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

configureOAuth();

// Routes

app.use("/auth", authRoutes);
app.use("/", authenticate, patientsRoute);
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));


const launchServer = async () => {
    try {
        await initDb();
        app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
    } catch (err) {
        console.error("Server failed to start:", err);
    }
};

launchServer();
