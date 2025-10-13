const prisma = require("../db/client");
const mime = require("mime-types");

async function showFileForm(req, res) {
  res.render("userFileForm");
}

async function postFilePath(req, res) {
  const { fileName } = req.body;
  let { path, mimetype } = req.file;
  const { id } = req.user;
  mimetype = mime.extension(mimetype);
  await prisma.userFile.create({
    data: {
      name: fileName,
      path: path,
      userId: id,
      type: mimetype,
    },
  });
  res.redirect("/");
}

async function deleteFile(req, res) {
  let { id } = req.params;
  id = Number(id);
  await prisma.userFile.delete({
    where: {
      id: id,
    },
  });
  res.redirect("/");
}

module.exports = {
  showFileForm,
  postFilePath,
  deleteFile,
};
