const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CompanySchema = new Schema({
    fantasyName: {
        type: String,
        required: true
    },
    socialName: {
        type: String,
        require: true
    },
    document: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: false
    },
    size: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    extraActivity: {
        type: String,
        required: false
    },
    activityArea: {
        type: Schema.Types.ObjectId,
        ref:'activity-areas',
        required: false
    },
    addresses:[{
        type: Schema.Types.ObjectId,
        ref:'addresses',
        required: true
    }],
    users:[{
        type: Schema.Types.ObjectId,
        ref:'users',
        required: false
    }],
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('companies', CompanySchema);