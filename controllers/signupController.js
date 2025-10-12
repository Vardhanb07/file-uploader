const prisma = require("../db/client");
const bcrypt = require("bcrypt");

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

async function addUser(req, res) {
  let { name, username, password } = req.body;
  password = await bcrypt.hash(password, 11);
  await prisma.user.create({
    data: {
      name: name,
      username: username,
      password: password,
    },
  });
  res.render("signupSuccess");
}

module.exports = {
  checkPasswords,
  addUser,
  showSignup,
};
