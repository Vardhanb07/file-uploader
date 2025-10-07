const path = require("node:path");

function protect(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.render("404")
  }
}

function showPage(req, res) {
  res.render("userIndex", { imgSrc: "/static/images/manage_account.svg" });
}

module.exports = { showPage, protect };
 