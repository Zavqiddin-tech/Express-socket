const { Schema, model, default: mongoose } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
