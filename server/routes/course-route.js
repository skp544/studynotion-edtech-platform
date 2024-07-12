import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
} from "../controllers/course-controller.js";
import { isAuth, isInstructor } from "../middlewares/auth-middleware.js";

const router = express.Router();

// /api/v1/course

router.post("/create", isAuth, isInstructor, createCourse);
router.get("/all-courses", getAllCourses);
router.post("/get-course", getCourseDetails);

export default router;
