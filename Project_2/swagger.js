const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Patient management api'
    },
    host: 'cse341-node-api.onrender.com',
    // host: 'localhost:3000',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const routes = ['./api/routes/patientsRoute.js'];


swaggerAutogen(outputFile, routes, doc);

