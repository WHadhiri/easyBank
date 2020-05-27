const express = require("express");

const AccountController = require("../controllers/accounts_controller");

const router = express.Router();
router.get("/:numacc", AccountController.getAccountByNum);
router.post("/", AccountController.addAccount);
module.exports = router;