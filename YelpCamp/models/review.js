const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const reviewSchema = new Schema({
  body: String,
  rating: String,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
