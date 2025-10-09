const express = require("express");
require("dotenv").config();
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");
const userRouter = require("./routes/userRouter");
const logoutRouter = require("./routes/logoutRouter");
const changeRouter = require("./routes/changeRouter");

const app = express();

const port = process.env.PORT || 7777;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);
app.use("/change", changeRouter);

app.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/user");
  } else {
    res.render("index");
  }
});

app.use("/user", userRouter);

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`localhost: http://localhost:${port}`);
});
