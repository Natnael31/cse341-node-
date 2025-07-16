const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Patient management api'
    },
    // host: 'cse341-node-api.onrender.com',
    host: 'cse341-node-api.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const routes = ['./api/routes/patientsRoute.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);

