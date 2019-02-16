const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    province: {
        type: Schema.Types.ObjectId,
        ref:'provinces',
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

mongoose.model('cities', CitySchema);