const express = require("express");
const jwt = require("jsonwebtoken");
const clientController = require("../controllers/clients-controller");

const router = express.Router();

router.get("/", clientController.getClients);
router.get("/:cin", clientController.getClientByCin);

router.use((req, res, next) => {
  if (req.method === "OPTIONS") return next();
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentification failed!");
    }
    const decodedToken = jwt.verify(token, "inner_bank_code");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new Error("Authentification failed!");
    error.code = 401;
    return next(error);
  }
});

router.post("/", clientController.addClient);
router.patch("/:cin", clientController.updateClient);

router.delete("/:id", clientController.deleteClient);

module.exports = router;
