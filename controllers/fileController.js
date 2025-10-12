const prisma = require("../db/client");

async function showFileForm(req, res) {
  res.render("userFileForm");
}

async function postFilePath(req, res) {
  const { fileName } = req.body;
  const { path } = req.file;
  const { id } = req.user;
  await prisma.userFile.create({
    data: {
      name: fileName,
      path: path,
      userId: id,
    },
  });
  res.redirect("/");
}

module.exports = {
  showFileForm,
  postFilePath,
};
