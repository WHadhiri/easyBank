const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  numacc: { type: String, required: true },
  typeofaccount: { type: String, required: true },
  status: { type: String, required: true },
  dateop: { type: Date, default: new Date() },
  datefund: { type: Date, default: null },
  dateclosed: { type: Date, default: null },
  lasttrans: { type: String, default: null },
  overallAmount: { type: Number, default: 0.0 },
  owner: { type: mongoose.Types.ObjectId, ref: "Client", default: null },
});

module.exports = mongoose.model("Account", accountSchema);
