const express = require("express");

const AccountController = require("../controllers/accounts_controller");

const router = express.Router();

router.get("/:idacc", AccountController.getAccountById);
router.get("/atm/:numacc", AccountController.getAccountByNum);
router.get("/:idclient/accounts", AccountController.getAccountsByClient);

router.post("/", AccountController.addAccount);
router.post("/atm", AccountController.accessATM);
router.post("/:numacc/deposit", AccountController.deposit);
router.post("/:numacc/withdrawl", AccountController.withdrawl);
router.post("/:numacc/transfer", AccountController.transfer);
module.exports = router;