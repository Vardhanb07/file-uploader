const db = require("../db/queries");

async function showFileForm(req, res) {
  res.render("userFileForm");
}

async function postFilePath(req, res) {
  await db.insertFilePath(req.user.id, req.file.path, req.body.fileName);
  res.redirect("/");
}

module.exports = {
  showFileForm,
  postFilePath,
};
