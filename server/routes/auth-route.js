import express from "express";
import {
  changePassword,
  login,
  resetPassword,
  resetPasswordToken,
  sendOTP,
  signUp,
} from "../controllers/auth-controller.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const router = express.Router();

// /api/v1/auth
router.post("/send-otp", sendOTP);
router.post("/register", signUp);
router.post("/login", login);
router.put("/change-password", isAuth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

export default router;
