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
  });
}

async function settings(req, res) {
  res.render("userSettings", {
    username: req.user.username,
    name: req.user.name,
  });
}

module.exports = { showPage, protect, settings };
