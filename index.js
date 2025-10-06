const express = require("express");
require("dotenv").config();
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");

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
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`localhost: http://localhost:${port}`);
});
