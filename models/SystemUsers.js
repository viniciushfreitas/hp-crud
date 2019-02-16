const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const SystemUserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    primaryPhone: {
        type: String,
        require: false
    },
    secundaryPhone: {
        type: String,
        require: false
    }, 
    type: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
});

mongoose.model('system-users', SystemUserSchema);