const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CurriculumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

mongoose.model('curriculum', CurriculumSchema);