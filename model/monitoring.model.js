const { Schema, model } = require("mongoose");

const monitoringSchema = new Schema(
  {
    clientId: { type: Schema.ObjectId, ref: "Client", required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("Monitoring", monitoringSchema);