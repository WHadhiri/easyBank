const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    numTrans: {type: String, required: true},
    typeofTrans: {type: String, required: true},
    nameTrans: {type: String, required: true},
    dateTrans: {type: Date, required: true},
    debit: {type: String, required: true},
    credit: {type: String, required: true},
    balance: {type: String, required: true},
    numacc: {type: String, required: true},
});

module.exports = mongoose.model('Transaction', transactionSchema);