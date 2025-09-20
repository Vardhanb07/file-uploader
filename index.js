const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 7777;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index")
});

app.listen(port, () => {
  console.log(`localhost: http://localhost:${port}`);
});
