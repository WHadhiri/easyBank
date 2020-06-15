const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    const err = new Error("Somthing went wrong. could not login!");
    err.code = 500;
    return next(err);
  }

  if (!user) {
    const err = new Error("Invalid credentials provided, could not login.");
    err.code = 404;
    return next(err);
  }

  let isValidPass = false;
  try {
    isValidPass = await bcrypt.compare(password, user.password);
  } catch (error) {
    const err = new Error(
      "could not login user, please check your credentiels."
    );
    err.code = 500;
    return next(err);
  }

  if (!isValidPass) {
    const err = new Error("Invalid credentials provided, could not login.");
    err.code = 401;
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      "inner_bank_code",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("logging user failed. Please try again!");
    error.code = 500;
    return next(error);
  }

  res.json({ userId: user.id, email: user.email, token: token });
};

const addUser = async (req, res, next) => {
  const { email, password } = req.body;

  let addedUser;
  try {
    addedUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new Error("Somthing went wrong. could not add user!");
    err.code = 500;
    return next(err);
  }

  if (addedUser) {
    const err = new Error("User already exists, please login instead.");
    err.code = 404;
    return next(err);
  }

  let hashPass;
  try {
    hashPass = await bcrypt.hash(password, 12);
  } catch (error) {
    const err = new Error("Could not create User. please try again.");
    err.code = 500;
    return next(err);
  }

  const createUser = new User({
    email,
    password: hashPass,
  });

  try {
    await createUser.save();
  } catch (errs) {
    const error = new Error("Creating user failed. Please try again!");
    error.code = 500;
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createUser.id, email: createUser.email },
      "inner_bank_code",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("Creating user failed. Please try again!");
    error.code = 500;
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createUser.id, email: createUser.email, token: token });
};

exports.login = login;
exports.addUser = addUser;
