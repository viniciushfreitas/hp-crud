const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfessionalSchema = new Schema({
    systemUser: {
        type: Schema.Types.ObjectId,
        ref:'system-users',
        required: true
    },
    nationality: {
        type: Schema.Types.ObjectId,
        ref:'nationalities',
        required: false
    },
    curriculum: {
        type: Schema.Types.ObjectId,
        ref:'curriculum',
        required: false
    },
    address: [{
        type: Schema.Types.ObjectId,
        ref:'addresses',
        required: true
    }],
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    maritalStatus: {
        type: String,
        require: true
    },
    pwd: {
        type: Boolean,
        require: true
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

mongoose.model('professionals', ProfessionalSchema);