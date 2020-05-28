const mongoose = require("mongoose");

const Account = require("../models/account");
const Trans = require("../models/Transaction");
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
const deposit = async (req, res, next) => {
  const {numacc,cin,typeofTrans,amount,nameTrans,numTrans} = req.body;
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
    numTrans,
    typeofTrans:"deposit",
    nameTrans,
    dateTrans: new Date(),
    debit:amount,
    credit:0,
    balance: accounts.overallAmount,
    numacc  
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

  res
    .status(200)
    .json({ accounts: accounts.toObject({ getters: true }) });
};

const withdrawl = async (req, res, next) => {
  const {numacc,cin,typeofTrans,amount,nameTrans,numTrans} = req.body;
  const Numacc = req.params.numacc;

  let accounts;
  try {
    accounts = await Account.findOne({ numacc: Numacc });
  } catch (error) {
    const err = new Error("Somthing went wrong. could not make operation!");
    err.code = 500;
    return next(err);
  }
  if(accounts.overallAmount > amount){
  accounts.overallAmount -= Number(amount);

  const createdTrans = new Trans({
    numTrans,
    typeofTrans:"withdrawl",
    nameTrans,
    dateTrans: new Date(),
    debit:0,
    credit:amount,
    balance: accounts.overallAmount,
    numacc  
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

  res
    .status(200)
    .json({ accounts: accounts.toObject({ getters: true }) });

}else{
  const error = new Error("insufficient balance. reload your account!");
    error.code = 500;
    return next(error);
}
};

const transfer = async (req, res, next) => {
  const {numacc,cin,typeofTrans,amount,nameTrans,numTrans,numaccDis} = req.body;
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
  if(accounts.overallAmount > amount){
  accounts.overallAmount -= Number(amount);
  accountsDis.overallAmount +=Number(amount);
  const createdTrans = new Trans({
    numTrans,
    typeofTrans:"transfer",
    nameTrans,
    dateTrans: new Date(),
    debit:amount,
    credit:0,
    balance: accounts.overallAmount,
    numacc  
  });

  const createdTrans1 = new Trans({
    numTrans,
    typeofTrans:"transfer",
    nameTrans,
    dateTrans: new Date(),
    debit:0,
    credit:amount,
    balance: accountsDis.overallAmount,
    numacc:numaccDis  
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

  res
    .status(200)
    .json({ accounts: accounts.toObject({ getters: true }),
            accountsDis: accountsDis.toObject({ getters: true }) 
    });

}else{
  const error = new Error("insufficient balance. reload your account!");
    error.code = 500;
    return next(error);
}
};

exports.transfer = transfer;
exports.withdrawl = withdrawl;
exports.deposit = deposit;
exports.getAccountByNum = getAccountByNum;
exports.addAccount = addAccount;
