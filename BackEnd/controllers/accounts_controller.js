const mongoose = require("mongoose");

const Account = require("../models/account");
const Trans = require("../models/Transaction");
const Client = require("../models/client");

const getAccountById = async (req, res, next) => {
  const accountId = req.params.idacc;

  let account;
  try {
    account = await Account.findById(accountId);
  } catch (error) {
    const err = new Error(
      "Somthing went wrong. could not find account with id!"
    );
    err.code = 500;
    return next(err);
  }

  if (!account) {
    const err = new Error("No account found with the provided ID!");
    err.code = 404;
    return next(err);
  }

  res.json({ account: account.toObject({ getters: true }) });
};

const getAccountByNum = async (req, res, next) => {
  const NumAccount = req.params.numacc;

  let account;
  try {
    account = await Account.findOne({ numacc: NumAccount });
  } catch (error) {
    const err = new Error(
      "Something went wrong. could not find account with number!"
    );
    err.code = 500;
    return next(err);
  }

  if (!account) {
    const err = new Error("No account found with the provided Account Number!");
    err.code = 404;
    return next(err);
  }

  res.json({ account: account.toObject({ getters: true }) });
};

const getAccountsByClient = async (req, res, next) => {
  const clientId = req.params.idclient;

  let accounts;
  try {
    accounts = await Account.find({ owner: clientId });
  } catch (error) {
    const err = new Error("Something went wrong. could not find accounts!");
    err.code = 500;
    return next(err);
  }

  if (!accounts || accounts.length === 0) {
    const err = new Error("No accounts found with the provided Client ID!");
    err.code = 404;
    return next(err);
  }

  res.json({
    accounts: accounts.map((account) => account.toObject({ getters: true })),
  });
};

const addAccount = async (sess, client, req, res, next) => {
  const { numacc, pin, typeofaccount } = req;
  const createdAccount = new Account({
    numacc,
    pin,
    typeofaccount,
    status: "Active",
    owner: client,
  });

  try {
    await createdAccount.save({ session: sess });
    client.accounts.push(createdAccount);
    await client.save({ session: sess });
  } catch (err) {
    const error = new Error("Creating account failed. Please try again!");
    error.code = 500;
    return next(error);
  }

  //res.status(201).json({ newAccount: createdAccount });
};
const deposit = async (req, res, next) => {
  const { numacc, cin, typeofTrans, amount, nameTrans } = req.body;
  const Numacc = req.params.numacc;

  let accounts;
  try {
    accounts = await Account.findOne({ numacc: Numacc });
  } catch (error) {
    const err = new Error("Somthing went wrong. could not make operation!");
    err.code = 500;
    return next(err);
  }
  accounts.overallAmount += Number(amount);

  const createdTrans = new Trans({
    numTrans: Math.floor(Math.random() * 1000000),
    typeofTrans: "deposit",
    nameTrans,
    dateTrans: new Date(),
    debit: amount,
    credit: 0,
    balance: accounts.overallAmount,
    numacc,
  });

  try {
    await accounts.save();
  } catch (err) {
    const error = new Error("Operation failed. Please try again!");
    error.code = 500;
    return next(error);
  }
  try {
    await createdTrans.save();
  } catch (err) {
    const error = new Error(" transaction failed. Please try again!");
    error.code = 500;
    return next(error);
  }

  res.status(200).json({ accounts: accounts.toObject({ getters: true }) });
};

const withdrawl = async (req, res, next) => {
  const { numacc, cin, typeofTrans, amount, nameTrans, numTrans } = req.body;
  const Numacc = req.params.numacc;

  let accounts;
  try {
    accounts = await Account.findOne({ numacc: Numacc });
  } catch (error) {
    const err = new Error("Somthing went wrong. could not make operation!");
    err.code = 500;
    return next(err);
  }
  if (accounts.overallAmount > amount) {
    accounts.overallAmount -= Number(amount);

    const createdTrans = new Trans({
      numTrans: Math.floor(Math.random() * 1000000),
      typeofTrans: "withdrawl",
      nameTrans,
      dateTrans: new Date(),
      debit: 0,
      credit: amount,
      balance: accounts.overallAmount,
      numacc,
    });

    try {
      await accounts.save();
    } catch (err) {
      const error = new Error("Operation failed. Please try again!");
      error.code = 500;
      return next(error);
    }
    try {
      await createdTrans.save();
    } catch (err) {
      const error = new Error(" transaction failed. Please try again!");
      error.code = 500;
      return next(error);
    }

    res.status(200).json({ accounts: accounts.toObject({ getters: true }) });
  } else {
    const error = new Error("insufficient balance. reload your account!");
    error.code = 500;
    return next(error);
  }
};

const transfer = async (req, res, next) => {
  const {
    numacc,
    cin,
    typeofTrans,
    amount,
    nameTrans,
    numTrans,
    numaccDis,
  } = req.body;
  const Numacc = req.params.numacc;

  let accounts;
  let accountsDis;
  try {
    accounts = await Account.findOne({ numacc: Numacc });
    accountsDis = await Account.findOne({ numacc: numaccDis });
  } catch (error) {
    const err = new Error("Somthing went wrong. could not make operation!");
    err.code = 500;
    return next(err);
  }
  if (accounts.overallAmount > amount) {
    accounts.overallAmount -= Number(amount);
    accountsDis.overallAmount += Number(amount);
    const createdTrans = new Trans({
      numTrans: Math.floor(Math.random() * 1000000),
      typeofTrans: "transfer",
      nameTrans,
      dateTrans: new Date(),
      debit: amount,
      credit: 0,
      balance: accounts.overallAmount,
      numacc,
    });

    const createdTrans1 = new Trans({
      numTrans: Math.floor(Math.random() * 1000000),
      typeofTrans: "transfer",
      nameTrans,
      dateTrans: new Date(),
      debit: 0,
      credit: amount,
      balance: accountsDis.overallAmount,
      numacc: numaccDis,
    });

    try {
      await accounts.save();
    } catch (err) {
      const error = new Error("Operation failed. Please try again!");
      error.code = 500;
      return next(error);
    }

    try {
      await accountsDis.save();
    } catch (err) {
      const error = new Error("Operation failed. Please try again!");
      error.code = 500;
      return next(error);
    }

    try {
      await createdTrans.save();
    } catch (err) {
      const error = new Error(" transaction failed. Please try again!");
      error.code = 500;
      return next(error);
    }
    try {
      await createdTrans1.save();
    } catch (err) {
      const error = new Error(" transaction failed. Please try again!");
      error.code = 500;
      return next(error);
    }

    res.status(200).json({
      accounts: accounts.toObject({ getters: true }),
      accountsDis: accountsDis.toObject({ getters: true }),
    });
  } else {
    const error = new Error("insufficient balance. reload your account!");
    error.code = 500;
    return next(error);
  }
};

const accessATM = async (req, res, next) => {
  const { numacc, pin } = req.body;
  let account;
  try {
    account = await Account.findOne({ numacc: numacc });
  } catch (error) {
    const err = new Error(
      "Something went wrong. could not find this account number!"
    );
    err.code = 500;
    return next(err);
  }

  if (!account || account.pin !== pin) {
    const err = new Error("Invalid credentials, could not access ATM");
    err.code = 404;
    return next(err);
  }

  let owner;
  try {
    owner = await Client.findById(account.owner);
  } catch (error) {
    const err = new Error("Something went wrong. could not find the owner");
    err.code = 500;
    return next(err);
  }

  if (!owner) {
    const err = new Error("could not find the owner of that account!!!");
    err.code = 500;
    return next(err);
  }

  res.status(201).json({ clientAccount: account, client: owner });
};

exports.transfer = transfer;
exports.withdrawl = withdrawl;
exports.deposit = deposit;
exports.getAccountByNum = getAccountByNum;
exports.addAccount = addAccount;
exports.getAccountById = getAccountById;
exports.getAccountsByClient = getAccountsByClient;
exports.accessATM = accessATM;
