const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.use(userController.protect);

userRouter.get("/", userController.showPage);

userRouter.get("/settings", userController.settings);

userRouter.get("/delete", userController.showPasswordVerification);

userRouter.post(
  "/delete/:id",
  userController.checkPassword,
  userController.deleteAccount
);

module.exports = userRouter;
