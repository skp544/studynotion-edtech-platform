import express from "express";
import {
  createRating,
  getAllRating,
  getAverageRating,
} from "../controllers/rating-and-review-controller.js";
import { isAuth, isStudent } from "../middlewares/auth-middleware.js";

const router = express.Router();

/// /api/v1/rating-and-review

router.post("/create", isAuth, isStudent, createRating);
router.get("/get-average-rating", getAverageRating);
router.get("/get-all-rating", getAllRating);

export default router;
