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

async function getUser(username) {
  async function f(username) {
    const userInfo = prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return userInfo;
  }
  return f(username)
    .then(async (userInfo) => {
      return userInfo;
      prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

async function getAllUsers() {
  async function f(username) {
    const userInfo = await prisma.user.findMany();
    return userInfo;
  }
  return f()
    .then(async (userInfo) => {
      prisma.$disconnect();
      return userInfo;
    })
    .catch(async (e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

async function getUserById(id) {
  async function f(id) {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return userInfo;
  }
  return f(id)
    .then(async (userInfo) => {
      prisma.$disconnect();
      return userInfo;
    })
    .catch(async (e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

async function updateName(id, name) {
  async function f(id, name) {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }
  f(id, name)
    .then(async () => {
      prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

async function updateUsername(id, username) {
  async function f(id, username) {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username,
      },
    });
  }
  f(id, username)
    .then(async () => {
      prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

async function updatePassword(id, password) {
  password = await bcrypt.hash(password, 11);
  async function f(id, password) {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });
  }
  f(id, password)
    .then(async () => {
      prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

async function insertFilePath(userId, filePath, fileName) {
  async function f(userId, filePath, fileName) {
    await prisma.userFile.create({
      data: {
        name: fileName,
        path: filePath,
        userId: userId,
      },
    });
  }
  f(userId, filePath, fileName)
    .then(async () => {
      prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

async function deleteFile(fileId) {
  async function f(fileId) {
    await prisma.userFile.delete({
      where: {
        id: fileId,
      },
    });
  }
  f(fileId)
    .then(async () => {
      prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

module.exports = {
  insertUsers,
  getUser,
  getAllUsers,
  getUserById,
  updateName,
  updateUsername,
  updatePassword,
  insertFilePath,
  deleteFile,
};
