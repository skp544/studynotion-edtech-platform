import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  namw: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
