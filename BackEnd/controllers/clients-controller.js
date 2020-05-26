const Client = require("../models/client");

const getClients = async (req, res, next) => {
  let clients;
  try {
    clients = await Client.find();
  } catch (error) {
    const err = new Error("Fetching clients failed. please try again!");
    err.code = 500;
    return next(err);
  }
  res.json({
    clients: clients.map((client) => client.toObject({ getters: true })),
  });
};

const getClientByCin = async (req, res, next) => {
  const clientCin = req.params.cin;

  let client;
  try {
    client = await Client.findOne({ cin: clientCin });
  } catch (error) {
    const err = new Error("Somthing went wrong. could not find client!");
    err.code = 500;
    return next(err);
  }

  if (!client) {
    const err = new Error("No client found with the provided CIN!");
    err.code = 404;
    return next(err);
  }

  res.json({ client: client.toObject({ getters: true }) });
};

const addClient = async (req, res, next) => {
  const {
    firstname,
    lastname,
    cin,
    email,
    birthday,
    contact,
    numacc,
  } = req.body;
  const createdClient = new Client({
    firstname,
    lastname,
    cin,
    email,
    birthday,
    contact,
    numacc,
  });

  try {
    await createdClient.save();
  } catch (err) {
    const error = new Error("Creating client failed. Please try again!");
    error.code = 500;
    return next(error);
  }

  res.status(201).json({ newClient: createdClient });
};

exports.getClients = getClients;
exports.addClient = addClient;
exports.getClientByCin = getClientByCin;
