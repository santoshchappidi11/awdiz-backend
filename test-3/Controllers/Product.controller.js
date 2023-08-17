import ProductModel from "../Models/Product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { image, name, price, category, token } = req.body;

    if (!image || !name || !price || !category || !token)
      return res
        .status(404)
        .json({ status: "error", message: "All fields are mandatory!" });

    const product = new ProductModel({ image, name, price, category });
    await product.save();

    return res
      .status(201)
      .json({ status: "success", message: "Product added successfully!" });
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
};
