const mongoose = require("mongoose");

const Account = require("../models/account");

const getAccountByNum = async (req, res, next) => {
  const NumAccount = req.params.numacc;

  let account;
  try {
    account = await Account.findOne({ numacc: NumAccount });
  } catch (error) {
    const err = new Error("Somthing went wrong. could not find account!");
    err.code = 500;
    return next(err);
  }

  if (!account) {
    const err = new Error("No account found with the provided CIN!");
    err.code = 404;
    return next(err);
  }

  res.json({ account: account.toObject({ getters: true }) });
};

const addAccount = async (client, req, res, next) => {
  const { numacc, typeofaccount } = req;
  const createdAccount = new Account({
    numacc,
    typeofaccount,
    status: "Active",
    owner: client,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdAccount.save({ session: sess });
    client.accounts.push(createdAccount);
    await client.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new Error("Creating account failed. Please try again!");
    error.code = 500;
    return next(error);
  }

  //res.status(201).json({ newAccount: createdAccount });
};
exports.getAccountByNum = getAccountByNum;
exports.addAccount = addAccount;
