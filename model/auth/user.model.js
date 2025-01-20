const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activated: { type: Boolean, default: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyId: { type: Schema.ObjectId, ref: "Company", required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "cashier"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
