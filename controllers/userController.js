const path = require("node:path");
const bcrypt = require("bcrypt");
const db = require("../db/queries");

function protect(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.render("404");
  }
}

async function showPage(req, res) {
  const filePaths = await db.getUserFilePaths(req.user.id);
  res.render("userIndex", {
    imgSrc: "/static/images/manage_account.svg",
    filePaths: filePaths,
  });
}

async function settings(req, res) {
  res.render("userSettings", {
    username: req.user.username,
    name: req.user.name,
  });
}

module.exports = { showPage, protect, settings };
