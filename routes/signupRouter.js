const { Router } = require("express");
const signupController = require("../controllers/signupController");

const signupRouter = Router();

signupRouter.get("/", signupController.showSignup);

signupRouter.post(
  "/",
  signupController.checkPasswords,
  signupController.addUser
);

module.exports = signupRouter;
