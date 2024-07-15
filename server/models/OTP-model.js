import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import otpTemplate from "../mail/emailVerificationTemplate.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: "5m",
  },
});

// function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email for StudyNotion",
      otpTemplate(otp)
    );

    console.log("Email Sent Successfully");
  } catch (error) {
    console.log("Failed to send email");
    console.log(error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
