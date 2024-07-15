import express from "express";
import {
  deleteAccount,
  getEnrolledCourse,
  getFullUserDetails,
  getUserDetails,
  instructorDashboard,
  updateDisplayPicture,
  updateProfile,
} from "../controllers/profile-controller.js";
import { isAuth, isInstructor } from "../middlewares/auth-middleware.js";

const router = express.Router();
/// /api/v1/profile

router.put("/update-profile", isAuth, updateProfile); //tested

router.delete("/delete", isAuth, deleteAccount);

router.get("/get-all-details", isAuth, getFullUserDetails); // tested

router.get("/get-user-details", isAuth, getUserDetails);

router.post("/update-display-picture", isAuth, updateDisplayPicture); // tested

router.get("/get-enrolled-courses", isAuth, getEnrolledCourse); //tested
router.get("/instructor-dashboard", isAuth, isInstructor, instructorDashboard); // tested

export default router;
