import Course from "../models/course-model";
import Section from "../models/section-model";

export const createSection = async (req, res) => {
  const { sectionName, courseId } = req.body;

  if (!sectionName || !courseId) {
    return res.status(400).json({
      success: false,
      message: "Missing Properties",
    });
  }

  const newSection = await Section.create({ sectionName });

  const updateCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $push: {
        courseContent: newSection._id,
      },
    },
    { new: true }
  )
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    .exec();
};
