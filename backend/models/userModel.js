import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: "" },
  phone: { type: String, default: "000000000" },
  address: { type: Object, default: { line1: "", line2: "" } },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
