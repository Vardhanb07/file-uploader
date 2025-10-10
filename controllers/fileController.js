const db = require("../db/queries");

async function showFileForm(req, res) {
  res.render("userFileForm");
}

async function uploadUserFile(req, res) {
  await db.insertFilePath(req.user.id, req.file.path);
  res.redirect("/");
}

module.exports = {
  showFileForm,
  uploadUserFile,
};
