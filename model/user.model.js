const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activated: { type: Boolean, required: true, default: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "director"],
      default: "director",
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);