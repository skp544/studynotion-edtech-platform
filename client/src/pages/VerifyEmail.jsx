import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { registerApi, sendOtpApi } from "../apis/auth";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [resendOtpLoading, setResendOtpLoading] = useState(false);

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      ...signupData,
      otp,
    };

    setSubmitLoading(true);

    const response = await registerApi(formData);

    setSubmitLoading(false);
    if (!response.success) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    navigate("/login");
  };

  const handleResendOtp = async (e) => {
    const formData = {
      email: signupData.email,
    };

    setResendOtpLoading(true);

    const response = await sendOtpApi(formData);

    setResendOtpLoading(false);
    if (!response.success) {
      return toast.error(response.message);
    }

    toast.success(response.message);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              disabled={submitLoading}
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              {submitLoading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/sign-up">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              type="button"
              className="flex items-center text-blue-100 gap-x-2"
              disabled={resendOtpLoading}
              onClick={handleResendOtp}
            >
              <RxCountdownTimer />
              {resendOtpLoading ? "Resending.." : "Resend it"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;