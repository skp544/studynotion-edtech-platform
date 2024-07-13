import express from "express";
import {
  createSection,
  deleteSection,
  updateSection,
} from "../controllers/section-controller.js";
import { isAuth, isInstructor } from "../middlewares/auth-middleware.js";

// /api/v1/section

const router = express.Router();

router.post("/create", isAuth, isInstructor, createSection); // tested

router.put("/update", isAuth, isInstructor, updateSection); // tested

router.delete("/delete", isAuth, isInstructor, deleteSection);

export default router;
