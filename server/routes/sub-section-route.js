import express from "express";
import {
  createSubSection,
  deleteSubSection,
  updateSubSection,
} from "../controllers/sub-section-controller.js";
import { isAuth, isInstructor } from "../middlewares/auth-middleware.js";

const router = express.Router();

// /api/v1/sub-section

router.post("/create", isAuth, isInstructor, createSubSection); //tested

router.put("/update", isAuth, isInstructor, updateSubSection); // tested

router.delete("/delete", isAuth, isInstructor, deleteSubSection);

export default router;
