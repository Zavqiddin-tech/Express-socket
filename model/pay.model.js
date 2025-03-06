const { Schema, model } = require("mongoose");

const paySchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "User", required: true },
    clientId: { type: Schema.ObjectId, ref: "Client", required: true },
    tradeId: { type: Schema.ObjectId, ref: "Trade", required: true },
    amount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("Pay", paySchema);
