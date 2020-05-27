const mongoose = require('mongoose');

const Account = require("../models/account");

const clientSchema = new mongoose.Schema({
    cin: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    birthday: {type: Date, required: true},
    contact: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},
        postalCode: {type: String, required: true},
    },
    accounts: [{type: mongoose.Types.ObjectId, required: true, ref: 'Account'}]
});

module.exports = mongoose.model('Client', clientSchema);