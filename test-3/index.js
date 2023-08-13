import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Login, Register } from "./Controllers/User.controller.js";

const app = express();
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("working!!!");
});

app.post("/register", Register);

app.post("/login", Login);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to DB...");
  })
  .catch((error) => {
    console.log("Something went wrong", error);
  });

app.listen(8002, () => {
  console.log("Listening on port 8002");
});
