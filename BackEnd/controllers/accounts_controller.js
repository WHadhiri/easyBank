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

  const addAccount = async (req, res, next) => {
    const {
      numacc,
      typeofaccount,
      status,
      dateop,
      datefund,
      dateclosed,
      lasttrans,
      overallAmount,
    } = req.body;
    const createdAccount = new Account({
      numacc,
      typeofaccount,
      status,
      dateop,
      datefund,
      dateclosed,
      lasttrans,
      overallAmount,
    });
  
    try {
      await createdAccount.save();
    } catch (err) {
      const error = new Error("Creating account failed. Please try again!");
      error.code = 500;
      return next(error);
    }
  
    res.status(201).json({ newAccount: createdAccount });
  };
  exports.getAccountByNum = getAccountByNum;
  exports.addAccount = addAccount;