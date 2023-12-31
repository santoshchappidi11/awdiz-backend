import UserModel from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return res.json({ status: "error", message: "All fields are required!" });

    const userLogged = await UserModel.find({ email });
    if (userLogged.length) {
      return res.json({
        success: false,
        message: "This email already exists, try different email!",
      });
    }

    if (userLogged.isBlocked) {
      return res.json({
        success: false,
        message: "You have been blocked!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ name, email, password: hashedPassword, role });
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

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ status: "error", message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ status: "error", message: "Not a valid json token!" });

    // return res.send(decodedData);

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "User not found!" });

    const userObj = {
      name: user?.name,
      email: user?.email,
      _id: user?._id,
    };

    return res.status(200).json({ status: "Success", user: userObj });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

