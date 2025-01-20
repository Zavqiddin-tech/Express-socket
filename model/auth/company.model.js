const { Schema, model } = require("mongoose");

const companySchema = new Schema(
  {
    companyName: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    users: [{ type: Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = model("Company", companySchema);
