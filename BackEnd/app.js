const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const clientRoutes = require("./routes/clients-routes");
const accountRoutes = require("./routes/Accounts_routes");
const transRoutes = require("./routes/Transactions_routes");
const app = express();

app.use(bodyParser.json());

app.use("/api/accounts", accountRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/trans", transRoutes);
app.use((req, res, next) => {
  const error = new Error("could not found this route.");
  error.code = 404;
  throw error;
});

app.use((error, req, res, next) => {
  if (req.headerSent) return next(error);
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error occured!" });
});

mongoose
  .connect(
    "mongodb+srv://easyadmin:easyBank2020@cluster0-e6ejd.mongodb.net/easyBank?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
