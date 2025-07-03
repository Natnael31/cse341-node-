// // req.query() Demo Example
// // Importing the express module
// var express = require('express');

// // Initializing the express and port number
// var app = express();
// var PORT = 3000;

// // Getting the request query string
// app.get('/api', function (req, res) {
//     console.log('id: ' + req.query.id)
//     res.send('id: ' + req.query.id);
// });

// // Listening to the port
// app.listen(PORT, function (err) {
//     if (err) console.log(err);
//     console.log("Server listening on PORT", PORT);
// });

// res.query() Demo Example
// Importing the express module
var express = require('express');

// Initializing the express and port number
var app = express();
var PORT = 3000;

// Getting the request query string
app.get('/api', function (req, res) {
    console.log('name: ' + req.query.id)
    res.send('name: ' + req.query.id);
});

// Listening to the port
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});