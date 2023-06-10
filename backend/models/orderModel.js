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
      enum: ["Not Process", "Processing","Unlocked"],
    },
    cancelled:{
      type: [Number],
      default: function () {
        return new Array(this.courses.length).fill(0);
      }
    }
  },
  { timestamps: true }
);

module.exports=mongoose.model('Order',orderModel)
