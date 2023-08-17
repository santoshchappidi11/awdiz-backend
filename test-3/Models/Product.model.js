import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  image: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Product", productSchema);
