const express = require("express");

const clientController = require("../controllers/clients-controller");

const router = express.Router();

router.get("/", clientController.getClients);
router.get("/:cin", clientController.getClientByCin);

router.post("/", clientController.addClient);
router.patch("/:cin", clientController.updateClient)

module.exports = router;
