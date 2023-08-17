import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  Login,
  Register,
  getCurrentUser,
} from "./Controllers/User.controller.js";
import {
  addProduct,
  allProducts,
  getYourProducts,
  updateYourProduct,
} from "./Controllers/Product.controller.js";
import { checkSeller } from "./Middlewares/Seller.middleware.js";

const app = express();
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("working!!!");
});

app.post("/register", Register);

app.post("/login", Login);

app.post("/get-current-user", getCurrentUser);

app.post("/add-product", checkSeller, addProduct);

app.get("/all-products", allProducts);

app.get("/get-your-products", checkSeller, getYourProducts);

app.patch("/update-your-product", checkSeller, updateYourProduct);

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
