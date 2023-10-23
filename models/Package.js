const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PackageSchema = new Schema(
  {
    images: [{ type: String }],
    date: { type: String, required: true },
    customer: {
      prefix: { type: String, required: true },
      id: { type: String, required: true },
    },
    trackingNumber: { type: String, required: true },
    package: {
      width: { type: String, default: "0" },
      length: { type: String, default: "0" },
      height: { type: String, default: "0" },
      weight: { type: String, default: "0" },
    },
    chat: [
      {
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
    ],
    recorder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      populate: { path: "recorder", select: "_id name email avatar" },
    },
    status: { type: String, default: "New" },
    staff: { type: String, default: "N/A" },
    assign: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        populate: { path: "recorder", select: "_id name email avatar" },
      },
    ],
  },
  { timestamps: true }
);

PackageSchema.index({ "$**": "text" });

module.exports = mongoose.model("Package", PackageSchema);
