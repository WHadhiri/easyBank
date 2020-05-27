const express = require("express");

const TransController = require("../controllers/transactions_controller");

const router = express.Router();
router.get("/:numacc", TransController.getTransByNum);
router.post("/", TransController.addTrans);
module.exports = router;