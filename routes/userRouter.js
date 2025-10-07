const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.use(userController.protect);

userRouter.get("/", userController.showPage);

module.exports = userRouter;
