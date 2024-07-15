import express from "express";
import {
  createCourse,
  deleteCourse,
  editCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  getInstructorDetails,
} from "../controllers/course-controller.js";
import { isAuth, isInstructor } from "../middlewares/auth-middleware.js";

const router = express.Router();

// /api/v1/course

router.post("/create", isAuth, isInstructor, createCourse); //tested

router.get("/all-courses", getAllCourses);

router.put("/edit-course", isAuth, isInstructor, editCourse);

router.post("/get-course", getCourseDetails);

router.post("/get-full-course-details", isAuth, getFullCourseDetails);

router.get(
  "/get-instructor-course",
  isAuth,
  isInstructor,
  getInstructorDetails
); // tested

router.delete("/delete-course", isAuth, isInstructor, deleteCourse);

export default router;
