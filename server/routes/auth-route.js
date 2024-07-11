import express from "express";
import {
  changePassword,
  login,
  sendOTP,
  signUp,
} from "../controllers/auth-controller";
import { isAuth } from "../middlewares/auth-middleware";

const router = express.Router();

// /api/v1/auth
router.post("/send-otp", sendOTP);
router.post("/register", signUp);
router.post("/login", login);
router.put("/change-password", isAuth, changePassword);

export default router;
