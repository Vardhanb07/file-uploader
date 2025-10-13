const path = require("node:path");
const prisma = require("../db/client");

async function downloadFile(req, res) {
  const { id } = req.params;
  const result = await prisma.userFile.findUnique({
    where: {
      id: Number(id),
    },
  });
  let { path, name, type } = result;
  name = name + "." + type;
  res.download(path, name, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = {
  downloadFile,
};
