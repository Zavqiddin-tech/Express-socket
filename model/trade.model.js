const { Schema, model } = require("mongoose");

const tradeSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "User", required: true },
    clientId: { type: Schema.ObjectId, ref: "Client", required: true },
    monitoringHistory: [
      { type: Schema.ObjectId, ref: "Monitoring", },
    ],
    text: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("Trade", tradeSchema);
