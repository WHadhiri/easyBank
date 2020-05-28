const express = require("express");

const AccountController = require("../controllers/accounts_controller");

const router = express.Router();
router.get("/:numacc", AccountController.getAccountByNum);
router.post("/", AccountController.addAccount);
router.post("/:numacc/deposit", AccountController.deposit);
router.post("/:numacc/withdrawl", AccountController.withdrawl);
router.post("/:numacc/transfer", AccountController.transfer);
module.exports = router;