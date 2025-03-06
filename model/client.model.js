const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    phoneOne: { type: String, required: true },
    phoneTwo: { type: String, default: "" },
		verify: {type: Boolean, default: false},
    userId: { type: Schema.ObjectId, ref: "User", required: true },
		totalPurchase: { type: Number, default: 0 },
		totalDebt: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("Client", clientSchema);