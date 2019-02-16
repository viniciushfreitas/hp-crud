const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const NationalitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

mongoose.model('nationalities', NationalitySchema);