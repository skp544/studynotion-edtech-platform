import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

export const isAuth = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token is missing!",
      });
    }

    // verify token
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ _id: decode.id });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User is not present" });
      }

      req.user = decode;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid!",
      });
    }
  } catch (error) {
    console.log("Error in is Auth middleware");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to authenticate",
    });
  }
};

export const isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for students only, Try again",
      });
    }

    next();
  } catch (error) {
    console.log("Error in is Student middleware");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify",
    });
  }
};

export const isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for instructor only, Try again",
      });
    }

    next();
  } catch (error) {
    console.log("Error in is Instructor middleware");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin only, Try again",
      });
    }

    next();
  } catch (error) {
    console.log("Error in is Admin middleware");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify",
    });
  }
};
