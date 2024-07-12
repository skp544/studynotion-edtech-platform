import express from "express";
import {
  createSubSection,
  deleteSubSection,
  updateSubSection,
} from "../controllers/sub-section-controller";
import { isAuth, isInstructor } from "../middlewares/auth-middleware";

const router = express.Router();

router.post("/create", isAuth, isInstructor, createSubSection);

router.put("/update", isAuth, isInstructor, updateSubSection);

router.delete("/delete", isAuth, isInstructor, deleteSubSection);

export default router;
