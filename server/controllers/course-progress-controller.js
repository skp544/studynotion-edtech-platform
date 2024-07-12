import CourseProgress from "../models/course-progress-model.js";
import SubSection from "../models/sub-section-model.js";

export const updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subsectionId } = req.body;
    const userId = req.user.id;

    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" });
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      });
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res
          .status(400)
          .json({ success: false, message: "Subsection already completed" });
      }

      // Push the subsection into the completedVideos array
      courseProgress.completedVideos.push(subsectionId);
    }
    // Save the updated course progress
    await courseProgress.save();

    return res
      .status(200)
      .json({ success: true, message: "Course progress updated" });
  } catch (error) {
    console.log("Error in update course controller");
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
