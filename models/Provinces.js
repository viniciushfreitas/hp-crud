const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProvinceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    initials: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

mongoose.model('provinces', ProvinceSchema);