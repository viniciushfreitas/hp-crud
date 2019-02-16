const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const IndicationCodeSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref:'system-users',
        required: true
    },
    uses: [{
        type: Schema.Types.ObjectId,
        ref:'indication-uses',
        required: false
    }],
    code: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

mongoose.model('indication-codes', IndicationCodeSchema);