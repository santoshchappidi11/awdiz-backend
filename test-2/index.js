import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./Model/User.model.js";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("This is home");
});

app.post("/login", function (req, res) {
  res.send("This is login");
});

app.post("/register", async function (req, res) {
  console.log(req.body, "req.body");
  const { name, surname, age, email, number, password, confirmPassword } =
    req.body;

  if (!name) return res.send("Name is missing...");
  if (!surname) return res.send("Surname is missing...");
  if (!age) return res.send("Age is missing...");
  if (!email) return res.send("Email is required...");
  if (!number) return res.send("Number is required...");
  if (!password) return res.send("Password is required...");
  if (!confirmPassword) return res.send("Confirm password is required...");
  if (password !== confirmPassword)
    return res.send("Password and Confirm Password not matched!");

  const user = new User({
    name: name,
    surname: surname,
    age: parseInt(age),
    email: email,
    number: parseInt(number),
    password: password,
  });

  await user.save();

  res.send("Registration done successfully!");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB...");
  })
  .catch((error) => {
    console.log("Error while connecting to DB", error);
  });

app.listen(8000, () => {
  console.log("server listening on port 8000");
});
