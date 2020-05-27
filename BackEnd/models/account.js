const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const accountSchema = new mongoose.Schema({
    numacc: {type: String, required: true},
    typeofaccount: {type: String, required: true},
    status: {type: Boolean, required: true},
    dateop: {type: Date, required: true},
    datefund: {type: Date, required: true},
    dateclosed: {type: Date, required: true},
    lasttrans: {type: String, required: true},
    overallAmount: {type: String, required: true}
    
});

module.exports = mongoose.model('Account', accountSchema);