import express from "express";
import { updateCourseProgress } from "../controllers/course-progress-controller.js";
import { isAuth, isStudent } from "../middlewares/auth-middleware.js";

const router = express.Router();

/// /api/v1/course-progress

router.put("/update", isAuth, isStudent, updateCourseProgress);

export default router;
