const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function insertUsers(name, username, password) {
  async function f(name, username, password) {
    password = await bcrypt.hash(password, 11);
    await prisma.user.create({
      data: {
        name: name,
        username: username,
        password: password,
      },
    });
  }
  f(name, username, password)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

module.exports = { insertUsers };
