const Trans = require("../models/Transaction");

const getTransByNum = async (req, res, next) => {
    const Numtran = req.params.numacc;
  
    let trans;
    try {
     trans = await Trans.findOne({ numacc: Numtran });
    } catch (error) {
      const err = new Error("Somthing went wrong. could not find transcation!");
      err.code = 500;
      return next(err);
    }
  
    if (!trans) {
      const err = new Error("No trans found with the provided Num account!");
      err.code = 404;
      return next(err);
    }
  
    res.json({ trans: trans.toObject({ getters: true }) });
  };

  const addTrans = async (req, res, next) => {
    const {
      numTrans,
      typeofTrans,
      nameTrans,
      dateTrans,
      debit,
      credit,
      balance,
      numacc
    } = req.body;
    const createdTrans = new Trans({
      numTrans,
      typeofTrans,
      nameTrans,
      dateTrans,
      debit,
      credit,
      balance,
      numacc  
    });
  
    try {
      await createdTrans.save();
    } catch (err) {
      const error = new Error("Creating client failed. Please try again!");
      error.code = 500;
      return next(error);
    }
  
    res.status(201).json({ newTrans: createdTrans });
  };
  exports.addTrans = addTrans;
  exports.getTransByNum = getTransByNum;
