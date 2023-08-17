import jwt from "jsonwebtoken";
import UserModel from "../Models/User.model.js";

export const checkSeller = async (req, res, next) => {
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
        .json({ status: "error", message: "Not a valid token!" });

    const userId = decodedData.userId;
    const user = await UserModel.findById(userId);

    if (!user || user.role != "Seller")
      return res
        .status(404)
        .json({ status: "error", message: "Not a valid user to add product" });

    next();
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
