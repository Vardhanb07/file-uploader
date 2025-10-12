const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const prisma = require("../db/client");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        return done(null, false, { message: "Please enter correct username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Please enter correct password" });
      }
      done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // const user = await db.getUserById(id);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

function showPage(req, res) {
  res.render("login", { loginFailureMessages: req.session.messages });
}

function loginUser(req, res, next) {
  req.session.messages = [];
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })(req, res, next);
}

module.exports = {
  loginUser,
  showPage,
};
