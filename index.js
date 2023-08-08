import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("Welcome!!!");
});

app.get("/login", function (req, res) {
  res.send("Welocme to login page!");
});

app.get("/cart", function (req, res) {
  res.send("Welcome to cart page!");
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
});
