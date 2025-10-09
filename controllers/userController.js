const path = require("node:path");
const bcrypt = require("bcrypt")

function protect(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.render("404");
  }
}

function showPage(req, res) {
  res.render("userIndex", { imgSrc: "/static/images/manage_account.svg" });
}

async function settings(req, res) {
  res.render("userSettings", { username: req.user.username, name: req.user.name });
}

module.exports = { showPage, protect, settings };
