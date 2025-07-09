// Data schema for adding contacts to the mongodb using mongoose

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    favoriteColor: String,
    birthDate: Date
});

module.exports = mongoose.model('Contact', contactSchema);
