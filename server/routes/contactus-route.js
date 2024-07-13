import express from "express";
import { contactUsController } from "../controllers/contactus-controller.js";

const router = express.Router();

// /api/v1/contact

router.post("/contact-us", contactUsController); // tested

export default router;
