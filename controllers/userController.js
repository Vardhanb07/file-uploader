const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

function protect(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.render("404");
  }
}

async function showPage(req, res) {
  async function f(userId) {
    const result = await prisma.userFile.findMany({
      where: {
        userId: userId,
      },
    });
    return result;
  }
  const result = await f(req.user.id);
  try {
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  }
  res.render("userIndex", {
    imgSrc: "/static/images/manage_account.svg",
    filePaths: result,
  });
}

async function settings(req, res) {
  res.render("userSettings", {
    username: req.user.username,
    name: req.user.name,
  });
}

module.exports = { showPage, protect, settings };
