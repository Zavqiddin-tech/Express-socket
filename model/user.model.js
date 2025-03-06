const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    companyName: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activated: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["admin", "seller"],
      required: true,
    },
    clientCount: {type: Number},
    debts: {type: Number},
    detail: {type: String}
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

// companyId: { type: Schema.ObjectId, ref: "Company", required: true },