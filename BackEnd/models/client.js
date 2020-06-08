const mongoose = require("mongoose");

const Account = require("./account");

const clientSchema = new mongoose.Schema({
  cin: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: Date, required: true },
  contact: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  accounts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Account" }],
});

clientSchema.post(
  "remove",
  function (next) {
    var client = this;
    console.log(client);
    Account.deleteMany(
      { _id: { $in: client.accounts } },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      },
      next
    );
  },
  function (err) {
    if (err) console.log(err);
  }
);

module.exports = mongoose.model("Client", clientSchema);
