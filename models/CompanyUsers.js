const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CompanyUserSchema = new Schema({
    systemUser: {
        type: Schema.Types.ObjectId,
        ref:'system-users',
        required: true
    },
    departament: {
        type: String,
        require: false
    },
    subtype: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
});

mongoose.model('company-users', CompanyUserSchema);