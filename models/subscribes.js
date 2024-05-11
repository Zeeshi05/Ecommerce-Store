import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const Emails = mongoose.model("Emails", emailSchema);
export default Emails;
