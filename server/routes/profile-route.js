import express from "express";
import {
  deleteAccount,
  getEnrolledCourse,
  getUserDetails,
  instructorDashboard,
  updateDisplayPicture,
  updateProfile,
} from "../controllers/profile-controller.js";
import { isAuth, isInstructor } from "../middlewares/auth-middleware.js";

const router = express.Router();
/// /api/v1/profile

router.put("/update-profile", isAuth, updateProfile);

router.delete("/delete", isAuth, deleteAccount);

router.get("/get-all-details", isAuth, getUserDetails);

router.post("/update-display-picture", isAuth, updateDisplayPicture);

router.get("/get-enrolled-courses", isAuth, getEnrolledCourse);
router.get("/instructor-dashboard", isAuth, isInstructor, instructorDashboard);

export default router;
