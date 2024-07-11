import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    types: String,
    required: true,
  },
});

const RatingAndReview = mongoose.model(
  "RatingAndReview",
  ratingAndReviewSchema
);

export default RatingAndReview;
