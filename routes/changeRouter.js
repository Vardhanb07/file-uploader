const { Router } = require("express");
const userController = require("../controllers/userController");
const changeController = require("../controllers/changeController");

const changeRouter = Router();

changeRouter.use(userController.protect);

changeRouter.get("/name", changeController.changeName);

changeRouter.get("/username", changeController.changeUsername);

changeRouter.get("/password", changeController.changePassword);

changeRouter.post(
  "/name",
  changeController.checkPassword,
  changeController.postUpdatedName
);

changeRouter.post(
  "/username",
  changeController.checkPassword,
  changeController.postUpdatedUsername
);

changeRouter.post(
  "/password",
  changeController.checkPassword,
  changeController.postUpdatedPassword
);

module.exports = changeRouter;
