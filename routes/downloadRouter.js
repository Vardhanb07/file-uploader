const { Router } = require("express");
const userController = require("../controllers/userController");
const downloadController = require("../controllers/downloadController")

const downloadRouter = Router();

downloadRouter.use(userController.protect);

downloadRouter.get("/:id", downloadController.downloadFile)

module.exports = downloadRouter;
