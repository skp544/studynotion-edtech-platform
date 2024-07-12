import Category from "../models/category-model.js";
import Course from "../models/course-model.js";
import User from "../models/user-model.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";

export const createCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,

      instructions,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "ALL FIELDS ARE REQUIRED",
      });
    }

    if (!status || status == undefined) {
      status = "Draft";
    }

    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor not Found",
      });
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category details not found",
      });
    }

    // uplaod image cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions,
    });

    // user update course user scme of instrycotor

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log("ERROR IN CREATE COURSE");

    return res.json({
      success: false,
      message: error.message || "Failed to create course",
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched",
      data: allCourses,
    });
  } catch (error) {
    console.log("ERROR IN GET ALL COURSE");

    return res.json({
      success: false,
      message: error.message || "Failed to fetch course",
    });
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("RatingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      res.status(400).json({
        success: false,
        message: `Cannot find the coruse with ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log("ERROR IN GET COURSE");

    return res.json({
      success: false,
      message: error.message || "Failed to create course",
    });
  }
};
