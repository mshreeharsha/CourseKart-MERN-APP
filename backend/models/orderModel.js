const mongoose=require('mongoose')

const orderModel = new mongoose.Schema(
  {
    courses: [
      {
        type: mongoose.ObjectId,
        ref: "Course",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing",  "cancel","nlocked"],
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model('Order',orderModel)
