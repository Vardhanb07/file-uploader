const bcrypt = require("bcrypt");
const prisma = require("../db/client");

function protect(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.render("404");
  }
}

async function showPage(req, res) {
  const { id } = req.user;
  const result = await prisma.userFile.findMany({
    where: {
      userId: id,
    },
  });
  res.render("userIndex", {
    accountSrc: "/static/images/manage_account.svg",
    filePaths: result,
    downloadSrc: "/static/images/download.svg",
    deleteSrc: "/static/images/delete.svg",
  });
}

async function settings(req, res) {
  const { username, name, id } = req.user;
  res.render("userSettings", {
    username: username,
    name: name,
    id: id,
  });
}

async function showPasswordVerification(req, res) {
  res.render("userPasswordVerification", {
    isPasswordCorrect: true,
    id: req.user.id,
  });
}

async function checkPassword(req, res, next) {
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    req.user.password
  );
  if (!isPasswordCorrect) {
    res.render("userPasswordVerification", {
      isPasswordCorrect: false,
      id: req.user.id,
    });
  } else {
    next();
  }
}

async function deleteAccount(req, res) {
  let { id } = req.params;
  id = Number(id);
  await prisma.userFile.deleteMany({
    where: {
      userId: id,
    },
  });
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
  req.logout(() => {
    res.redirect("/");
  });
}

module.exports = {
  showPage,
  protect,
  settings,
  deleteAccount,
  checkPassword,
  showPasswordVerification,
};
