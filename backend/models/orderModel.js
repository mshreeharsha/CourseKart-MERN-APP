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
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing",  "cancel"],
    },
  },
  { timestamps: true }
);


module.exports=mongoose.model('Order',orderModel)
