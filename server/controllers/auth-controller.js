import OTP from "../models/OTP-model";
import User from "../models/user-model";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import Profile from "../models/profile-model";
import jwt from "jsonwebtoken";
import mailSender from "../utils/mailSender";

// send otp
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // check user is present or not
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Present!",
      });
    }

    // generating otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    console.log("OTP GENERATED: ", otp);

    // check unique otp or not

    let result = await OTP.findOne({ otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      result = await OTP.findOne({ otp });
    }

    const newOtp = await OTP.create({ email, otp });

    return res.status(201).json({
      success: true,
      message: "OTP send Successfully. Please Check your email.",
      newOtp,
    });
  } catch (e) {
    console.log("Error in SendOTP Controller");
    console.log(e);

    return res.status(500).json({
      success: false,
      message: e.message || "Failed to Send The OTP",
    });
  }
};

// sign up

export const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // checking fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // checking password

    if (!password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password doest not matched!",
      });
    }

    // checking user is present or not
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Present!",
      });
    }

    // check recent otp

    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: 1 })
      .limit(1);

    console.log("recent otp ", recentOtp);

    // valiate otp

    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Not Found",
      });
    } else if (otp !== recentOtp.otp) {
      return res
        .status(404)
        .json({ success: false, message: "OTP Not Matched!" });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    let approved = "";

    // checking account type
    accountType === "Instructor" ? (approved = false) : (approved = true);

    // creating profile details
    const profileDetails = await Profile({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: contactNumber || null,
    });

    // creating new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      profileUrl: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(201).json({
      success: true,
      message: "User is Registered!",
      data: {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        profileUrl: newUser.profileUrl,
        accountType: newUser.accountType,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to Signup",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required!",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered. Please Signup first!",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({
        success: false,
        message: "Password Doestn't match.  Please enter correct password",
      });
    }

    const jwtPayload = {
      id: user._id,
      email: user.email,
      role: user.accountType,
    };

    const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.token = token;

    // cookies

    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: false,
        message: "Login Successfull!",
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profileUrl: user.profileUrl,
        },
        token,
      });
  } catch (error) {
    console.log("Error in Login Controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to login!",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: true,
        message: "The password is incorrect",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "The password and confrim password does not match",
      });
    }

    // update password indb
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        `Password Update Successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
      );

      console.log("Email Response", emailResponse);
    } catch (error) {
      console.log("Error Occurred while sending email");

      return res.status(500).json({
        success: false,
        message: error.message || "Error occurred while sending an email",
      });
    }

    console.log("Email Sent Successfully: ", emailResponse.response);

    return res.status(200).json({
      success: true,
      message: "Password Update Successfully",
    });
  } catch (error) {
    console.log("Error in Change Password Controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to Change Password!",
    });
  }
};