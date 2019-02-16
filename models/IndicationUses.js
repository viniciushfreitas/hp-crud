const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const IndicationUseSchema = new Schema({
    systemUser: {
        type: Schema.Types.ObjectId,
        ref:'system-users',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

mongoose.model('indication-uses', IndicationUseSchema);