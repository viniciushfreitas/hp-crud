const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CitySchema = new Schema({
    creationDate: {
        type: Date,
        required: true
    },
    systemUser: {
        type: Schema.Types.ObjectId,
        ref:'system-users',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

mongoose.model('temp-codes', CitySchema);