const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const AddressSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: String,
        require: false
    },
    neighborhood: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        require: true
    },
    complement: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

mongoose.model('addresses', AddressSchema);