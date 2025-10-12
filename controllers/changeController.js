const bcrypt = require("bcrypt");
const prisma = require("../db/client")

async function changeName(req, res) {
  res.render("changeUserDetails", {
    routeName: "name",
    isPasswordCorrect: true,
  });
}

async function changeUsername(req, res) {
  res.render("changeUserDetails", {
    routeName: "username",
    isPasswordCorrect: true,
  });
}

async function changePassword(req, res) {
  res.render("changeUserDetails", {
    routeName: "password",
    isPasswordCorrect: true,
  });
}

async function checkPassword(req, res, next) {
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    req.user.password
  );
  const routeName = req.path.slice(1);
  if (!isPasswordCorrect) {
    res.render("changeUserDetails", {
      routeName: routeName,
      isPasswordCorrect: isPasswordCorrect,
    });
  } else {
    next();
  }
}

async function postUpdatedName(req, res) {
  await prisma.user.update({
    where: {
      id: req.user.id
    },
    data: {
      name: req.body.newname
    }
  })
  res.redirect("/user/settings");
}

async function postUpdatedUsername(req, res) {
  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    body: {
      username: req.body.newusername,
    },
  });
  res.redirect("/user/settings");
}

async function postUpdatedPassword(req, res) {
  password = await bcrypt.hash(req.body.newpassword, 11);
  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      password: password,
    },
  });
  res.redirect("/user/settings");
}

module.exports = {
  changeName,
  changePassword,
  changeUsername,
  postUpdatedName,
  postUpdatedUsername,
  postUpdatedPassword,
  checkPassword,
};
