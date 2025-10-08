const path = require("node:path");

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

function settings(req, res) {
  res.render("userSettings", { username: req.user.username });
}

module.exports = { showPage, protect, settings };
