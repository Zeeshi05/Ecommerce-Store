import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
});

const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;
