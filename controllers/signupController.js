const db = require("../db/queries");

function showSignup(req, res) {
  res.render("signup", { doPasswordsMatch: true });
}

function checkPasswords(req, res, next) {
  const { password, repeatPassword } = req.body;
  if (password != repeatPassword) {
    res.render("signup", { doPasswordsMatch: false });
  } else {
    next();
  }
}

function addUser(req, res) {
  const { name, username, password } = req.body;
  db.insertUsers(name, username, password);
  res.render("signupSuccess");
}

module.exports = {
  checkPasswords,
  addUser,
  showSignup,
};
