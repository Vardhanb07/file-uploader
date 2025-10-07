const { Router } = require("express");
const logoutController = require("../controllers/logoutController");
const userController = require("../controllers/userController");

const logoutRouter = Router();

logoutRouter.use(userController.protect);

logoutRouter.get("/", logoutController.logoutUser);

module.exports = logoutRouter;
