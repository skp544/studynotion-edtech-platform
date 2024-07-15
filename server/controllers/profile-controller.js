import Course from "../models/course-model.js";
import CourseProgress from "../models/course-progress-model.js";
import Profile from "../models/profile-model.js";
import User from "../models/user-model.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";

export const updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;

    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById(id);
    const profileDetails = await Profile.findById(
      userDetails.additionalDetails
    );

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });

    await user.save();
    // Update the profile fields
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;

    profileDetails.gender = gender;

    // Save the updated profile
    await profileDetails.save();

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUserDetails,
    });
  } catch (error) {
    console.log("Error in Update User Controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to update user",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(user.additionalDetails),
    });

    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: id } },
        { new: true }
      );
    }

    // Now Delete User
    await CourseProgress.deleteMany({ userId: id });
    await User.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete profile controller");
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" });
  }
};

export const getFullUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully!",
      data: userDetails,
    });
  } catch (error) {
    console.log("Error in get user details ");
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch data",
    });
  }
};

export const updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { profileUrl: image.secure_url },
      { new: true }
    );

    return res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    console.log("Error in upload image controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload",
    });
  }
};

export const getEnrolledCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    userDetails = userDetails.toObject();
    var SubsectionLength = 0;

    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "",
      data: userDetails.courses,
    });
  } catch (error) {
    console.log("Error in get enrolled course");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });
    res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      data: courseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id).populate("additionalDetails").exec();

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully!",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileUrl: user.profileUrl,
        profileId: user.additionalDetails._id,
        gender: user.additionalDetails.gender,
        contactNumber: user.additionalDetails.contactNumber,
        dateOfBirth: user.additionalDetails.dateOfBirth,
        about: user.additionalDetails.about,
        accountType: user.accountType,
      },
    });
  } catch (error) {
    console.log("Error in get user details ");
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch data",
    });
  }
};
