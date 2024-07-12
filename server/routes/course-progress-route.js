import express from "express";
import { updateCourseProgress } from "../controllers/course-progress-controller";

const router = express.Router();

router.put("/update", updateCourseProgress);

export default router;
