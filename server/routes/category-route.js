import express from "express";
import {
  categoryPageDetails,
  createCategory,
  showAllCategories,
} from "../controllers/category-controller.js";
import { isAdmin, isAuth } from "../middlewares/auth-middleware.js";

const router = express.Router();

// /api/v1/category

router.post("/create", isAuth, isAdmin, createCategory); // tested

router.get("/all-categories", showAllCategories); // tested

router.post("/get-category-details", categoryPageDetails); // tested

export default router;
