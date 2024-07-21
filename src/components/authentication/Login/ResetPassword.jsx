import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisterImg from "../../../../public/assets/image1.jpeg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import configVariables from "../../../configurations/config";
import OtpInput from "../../utilities/OtpInput";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

function ResetPassword() {
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwtToken");

  if (jwtToken) {
    return <Navigate to="/" />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const [serverPasswordError, setServerPasswordError] = useState(false);
  const [serverPasswordErrorMessage, setServerPasswordErrorMessage] =
    useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [showOTPInput, setShowOTPInput] = useState(false);
  const [showOTPError, setShowOTPError] = useState(false);
  const [genOtp, setGenOtp] = useState("");
  const [isValidOtp, setIsValidOtp] = useState(false);

  const generateOTP = () => {
    const max = 9000;
    const min = 1000;

    const otp = Math.floor(Math.random() * max) + min;
    setGenOtp(otp);
    return otp;
  };

  const handleOtpSubmit = (userEnteredOtp) => {
    if (parseInt(userEnteredOtp) !== genOtp) {
      setShowOTPError(true);
      setIsValidOtp(false);
    } else {
      setShowOTPError(false);
      setIsValidOtp(true);
    }
  };

  const handleEmailOtp = async () => {
    setEmailError(false);
    if (!email) return setEmailError(true);

    const emailOTP = generateOTP();
    try {
      const body = {
        emailOTP,
        email,
        otpFor: "Reset Password",
      };

      const sendEmailOtpResponse = await axios.post(
        `${configVariables.ipAddress}/users/resetPasswordEmailotp`,
        body
      );

      if (sendEmailOtpResponse.status === 200) {
        toast.success("OTP sent to email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setShowOTPInput(true);
        setServerError(false);
      }
    } catch (error) {
      console.log("Error while sending otp through email", error);
      if (error.response.status > 201) {
        setServerError(true);
        setServerErrorMessage(error.response.data.message);
      }
    }
  };

  const handleResetPassword = async () => {
    setServerPasswordError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    if (!password) return setPasswordError(true);
    if (password !== confirmPassword) return setConfirmPasswordError(true);

    try {
      const response = await axios.post(
        `${configVariables.ipAddress}/users/resetPassword`,
        { email, password }
      );
      if (response.status === 200) {
        toast.success("Password Changed Successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.log("Reset Password :: handleResetPassword :: Error", error);
      if (error.response.status > 201) {
        setServerPasswordError(true);
        setServerPasswordErrorMessage(error.response.data.message);
      }
    }
  };

  const renderPasswordFields = () => (
    <div>
      <div className="space-y-1">
        <label
          className={`${
            passwordError ? "text-red-500" : "text-black"
          } text-md font-bold`}
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative flex items-center">
          <input
            placeholder="Set your password"
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            className={`p-2 w-full border rounded-xl focus:outline-none ${
              passwordError ? "border-red-500" : "border-slate-500"
            } text-black text-sm`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <VisibilityOffRoundedIcon sx={{ color: "black" }} />
            ) : (
              <VisibilityRoundedIcon sx={{ color: "black" }} />
            )}
          </div>
        </div>
        {passwordError && (
          <span className="text-red-500 text-xs md:text-sm">
            *Password is mandatory
          </span>
        )}
      </div>
      <div className="space-y-1">
        <label
          className={`${
            confirmPasswordError ? "text-red-500" : "text-black"
          } text-md font-bold`}
          htmlFor="confirm-password"
        >
          Confirm password
        </label>
        <div className="relative flex items-center">
          <input
            placeholder="Confirm your password"
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            className={`p-2 w-full border rounded-xl focus:outline-none ${
              confirmPasswordError ? "border-red-500" : "border-slate-500"
            } text-black text-sm`}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            className="absolute right-2 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <VisibilityOffRoundedIcon sx={{ color: "black" }} />
            ) : (
              <VisibilityRoundedIcon sx={{ color: "black" }} />
            )}
          </div>
        </div>
        {confirmPasswordError && (
          <span className="text-red-500 text-xs md:text-sm">
            *Password doesn't match
          </span>
        )}
        {serverPasswordError && (
          <span className="text-red-500 text-xs md:text-sm">
            {serverPasswordErrorMessage}
          </span>
        )}
      </div>

      <button
        className="w-1/2 border rounded-xl border-slate-500  px-1 py-2 my-2 text-black disabled:cursor-not-allowed"
        onClick={handleResetPassword}
      >
        Change Password
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat bg-overlay -mt-6 flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <ToastContainer />
      <div className="relative flex flex-col p-3 w-[90%] sm:w-[50%] sm:mt-20 md:w-[35%] border border-slate-500 rounded-2xl shadow-2xl">
        <div className="absolute self-center -top-16">
          <img src={RegisterImg} alt="" className="h-32 w-32 rounded-full " />
        </div>
        <div className="mt-16 space-y-2">
          <label
            className={`${
              emailError ? "text-red-500" : "text-black"
            } text-md font-bold`}
            htmlFor="email"
          >
            Enter your registered email
          </label>
          <input
            placeholder="example@example.com"
            id="email"
            type="email"
            value={email}
            disabled={isValidOtp}
            required
            className={`p-2 w-full border rounded-xl focus:outline-none ${
              emailError ? "border-red-500" : "border-slate-500"
            } text-black text-sm disabled:cursor-not-allowed`}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          {emailError && (
            <span className="text-red-500 text-xs md:text-sm">
              *Email is mandatory
            </span>
          )}
          {serverError && (
            <span className="text-red-500 text-xs md:text-sm">
              {serverErrorMessage}
            </span>
          )}
        </div>
        {!showOTPInput && (
          <div className="px-2 py-3 w-1/2 m-auto">
            <button
              type="button"
              className="w-full border rounded-full border-slate-500 py-2 px-3 text-black disabled:cursor-not-allowed"
              onClick={handleEmailOtp}
              // disabled={showOTPInput}
            >
              Send OTP
            </button>
          </div>
        )}

        {showOTPInput && !isValidOtp && (
          <>
            <p className="text-sm text-black py-2">
              Please enter OTP sent to <b>{email}</b>.
            </p>
            <OtpInput length={4} onOtpSubmit={handleOtpSubmit} />
            {showOTPError && (
              <p className="text-red-500 text-xs pt-2">Incorrect OTP</p>
            )}
          </>
        )}

        {showOTPInput && !isValidOtp && (
          <div className="px-2 py-3 m-auto flex flex-col">
            <button
              onClick={handleEmailOtp}
              className="mb-1 cursor-pointer text-blue-800 underline "
            >
              Resend OTP
            </button>
          </div>
        )}
        {showOTPInput && isValidOtp && (
          <p className="text-green-500 text-center">OTP Verified</p>
        )}
        {isValidOtp && renderPasswordFields()}
        <p className="font-sans text-sm sm:text-base text-black">
          <span>Already have an account? </span>
          <Link className="text-blue-800 underline pt-2 pl-1" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
