const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const userController = require("../controllers/userController");
const fileController = require("../controllers/fileController");

const fileRouter = Router();

fileRouter.use(userController.protect);

fileRouter.get("/upload", fileController.showFileForm);

fileRouter.post("/upload", upload.single("file"), fileController.postFilePath);

fileRouter.get("/delete/:id", fileController.deleteFile)

module.exports = fileRouter;
