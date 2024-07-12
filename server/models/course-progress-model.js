import mongoose from "mongoose";

const courseProgressSchema = mongoose.Schema.object({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
});

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);

export default CourseProgress;
