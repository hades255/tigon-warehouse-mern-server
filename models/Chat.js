const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      populate: { path: "package", select: "_id date trackingNumber" },
    },
    from: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      avatar: { type: String, default: "" },
    },
    to: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      avatar: { type: String, default: "" },
    },
    msg: { type: String, default: "" },
    date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
