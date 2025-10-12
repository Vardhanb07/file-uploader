const prisma = require("../db/client");

async function downloadFile(req, res) {
  const { id } = req.params;
  const result = await prisma.userFile.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.send("test");
}

module.exports = {
  downloadFile,
};
