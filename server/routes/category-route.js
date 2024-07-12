import express from "express";
import {
  categoryPageDetails,
  createCategory,
  showAllCategories,
} from "../controllers/category-controller.js";
import { isAdmin, isAuth } from "../middlewares/auth-middleware.js";

const router = express.Router();

// /api/v1/category

router.post("/create", isAuth, isAdmin, createCategory);

router.get("/all-categories", showAllCategories);

router.post("/get-category-details", categoryPageDetails);

export default router;
