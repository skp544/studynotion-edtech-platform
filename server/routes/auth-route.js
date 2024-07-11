import express from "express";
import { sendOTP, signUp } from "../controllers/auth-controller";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/register", signUp);

export default router;
