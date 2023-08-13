import UserModel from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ status: "error", message: "All fields are required!" });

    const isUserEmailExist = await UserModel.find({ email: email });
    if (isUserEmailExist.length) {
      return res.json({
        status: "error",
        message: "This email already exists, try different email!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();
    return res.json({
      status: "success",
      message: "Registration successfull!",
    });
  } catch (error) {
    return res.json({ status: "error", message: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ status: "error", message: "All fields are required!" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ status: "error", message: "User not found!" });

    const isPasswordRight = await bcrypt.compare(password, user.password);

    if (isPasswordRight) {
      const userObject = {
        name: user.name,
        email: user.email,
        _id: user.id,
      };

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return res.json({
        status: "success",
        message: "Login successfull",
        user: userObject,
        token: token,
      });
    }
    return res.json({ status: "error", message: "Password is wrong" });
  } catch (error) {
    return res.json({ status: "error", message: error });
  }
};
