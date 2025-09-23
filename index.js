const express = require("express");
require("dotenv").config();
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");

const app = express();

const port = process.env.PORT || 7777;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.use((req, res, next) => {
  res.status(404).render("404")
})

app.listen(port, () => {
  console.log(`localhost: http://localhost:${port}`);
});
