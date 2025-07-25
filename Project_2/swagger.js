const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Medical records management api'
    },
    host: 'cse341-node-api2.onrender.com',
    // host: 'localhost:3000',
    schemes: ['https'],
};

const outputFile = './swagger.json';
// const routes = ['./api/routes/patientsRoute.js'];
const routes = ['./api/routes/patientsRoute.js', './api/routes/authRoutes.js'];


swaggerAutogen(outputFile, routes, doc);

