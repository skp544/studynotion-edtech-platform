import express from "express";
import { contactUsController } from "../controllers/contactus-controller.js";

const router = express.Router();

router.post("/contact-us", contactUsController);

export default router;
