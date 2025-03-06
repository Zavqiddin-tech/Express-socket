const { Schema, model } = require("mongoose");

const tradeSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "User", required: true },
    clientId: { type: Schema.ObjectId, ref: "Client", required: true },
    payHistory: [{ type: Schema.ObjectId, ref: "Pay" }],
    text: { type: String, required: true, default: "" },
    price: { type: Number, required: true, default: 0 },
    paid: { type: Number, required: true, default: 0 },
  
  },
  { timestamps: true }
);

module.exports = model("Trade", tradeSchema);
