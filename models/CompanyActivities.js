const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CompanyActivitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

mongoose.model('activity-areas', CompanyActivitySchema);