import axios from "axios";
import React, { useState } from "react";
import configVariables from "../../../configurations/config";
import { Link, Navigate, useNavigate } from "react-router-dom";
import RegisterImg from "../../../../public/assets/image1.jpeg";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "../../utilities/OtpInput";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showOTPInput, setShowOTPInput] = useState(false);

  const [showOTPError, setShowOTPError] = useState(false);

  const [genOtp, setGenOtp] = useState("");

  const [isValidOtp, setIsValidOtp] = useState(false);

  const jwtToken = Cookies.get("jwtToken");

  const [formErrors, setFormErrors] = useState({
    name: false,
    mobile: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const generateOTP = () => {
    const max = 9000;
    const min = 1000;

    const otp = Math.floor(Math.random() * max) + min;
    setGenOtp(otp);
    return otp;
  };

  const validateForm = () => {
    const errors = {};

    if (!name) errors.name = true;
    if (!mobile) errors.mobile = true;
    if (!email) errors.email = true;
    if (!password) errors.password = true;
    if (password !== confirmPassword) errors.confirmPassword = true;

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleEmailOtp = async () => {
    const isFormValid = validateForm();
    if (!isFormValid) return;
    // if (!validateForm()) return;

    const emailOTP = generateOTP();

    try {
      const body = {
        emailOTP,
        email,
        username: name,
        password,
        mobile,
        otpFor: "email verification",
      };

      const sendEmailOtpResponse = await axios.post(
        `${configVariables.ipAddress}/users/emailotp`,
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
      console.log("error while sending otp through email", error);
      if (error.response.status > 201) {
        setServerError(true);
        setServerErrorMessage(error.response.data.message);
      }
    }
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

  const handleRegistration = async (e) => {
    e.preventDefault();

    const body = {
      name,
      email,
      mobile,
      password,
    };

    try {
      const response = await axios.post(
        `${configVariables.ipAddress}/users/registerUser`,
        body
      );
      if (response.status === 201) {
        toast.success("User Registerd Successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log("Error while register:", error);
      if (error.response.status > 201) {
        setServerError(true);
        setServerErrorMessage(error.response.data.message);
      }
    }
  };

  if (jwtToken) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat bg-overlay -mt-6"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen pb-24">
        <div className="relative flex flex-col p-3 w-96 border border-slate-500 rounded-2xl shadow-2xl mt-36 md:w-3/5">
          <div className="absolute self-center -top-16">
            <img src={RegisterImg} alt="" className="h-32 w-32 rounded-full " />
          </div>
          <form
            className="mt-16 text-sans space-y-3 md:space-y-0 flex flex-wrap"
            onSubmit={handleRegistration}
          >
            <div className="w-full md:w-1/2 px-2">
              <div className="space-y-1">
                <label
                  className={`${
                    formErrors.name ? "text-red-500" : "text-black"
                  } text-md font-bold`}
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  placeholder="Full name"
                  id="name"
                  type="text"
                  value={name}
                  className={`p-2 w-full border rounded-xl focus:outline-none ${
                    formErrors.name ? "border-red-500" : "border-slate-500"
                  } text-black text-sm`}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && (
                  <span className="text-red-500 text-xs md:text-sm">
                    *Name is mandatory
                  </span>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="space-y-1">
                <label
                  className={`${
                    formErrors.email ? "text-red-500" : "text-black"
                  } text-md font-bold`}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  placeholder="example@example.com"
                  id="email"
                  type="email"
                  value={email}
                  className={`p-2 w-full border rounded-xl focus:outline-none ${
                    formErrors.email ? "border-red-500" : "border-slate-500"
                  } text-black text-sm`}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />
                {formErrors.email && (
                  <span className="text-red-500 text-xs md:text-sm">
                    *Email is mandatory
                  </span>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="space-y-1">
                <label
                  className={`${
                    formErrors.mobile ? "text-red-500" : "text-black"
                  } text-md font-bold`}
                  htmlFor="mobile"
                >
                  Mobile
                </label>
                <input
                  placeholder="Mobile number"
                  id="mobile"
                  type="number"
                  value={mobile}
                  className={`p-2 w-full border rounded-xl focus:outline-none no-spinner ${
                    formErrors.mobile ? "border-red-500" : "border-slate-500"
                  } text-black text-sm`}
                  onChange={(e) => setMobile(e.target.value)}
                />
                {formErrors.mobile && (
                  <span className="text-red-500 text-xs md:text-sm">
                    *Mobile number is mandatory
                  </span>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="space-y-1">
                <label
                  className={`${
                    formErrors.password ? "text-red-500" : "text-black"
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
                      formErrors.password
                        ? "border-red-500"
                        : "border-slate-500"
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
                {formErrors.password && (
                  <span className="text-red-500 text-xs md:text-sm">
                    *Password is mandatory
                  </span>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="space-y-1">
                <label
                  className={`${
                    formErrors.confirmPassword ? "text-red-500" : "text-black"
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
                      formErrors.confirmPassword
                        ? "border-red-500"
                        : "border-slate-500"
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
                {formErrors.confirmPassword && (
                  <span className="text-red-500 text-xs md:text-sm">
                    *Password doesn't match
                  </span>
                )}
              </div>
            </div>
            <div className="w-full text-center">
              {serverError && (
                <p className="text-red-500 text-sm md:text-md pt-1 px-2 text-left">
                  {serverErrorMessage}
                </p>
              )}
              {!showOTPInput && (
                <div className="px-2 py-3 w-1/2 m-auto">
                  <button
                    type="button"
                    className="w-1/2 border rounded-full border-slate-500 p-3 text-black disabled:cursor-not-allowed"
                    onClick={handleEmailOtp}
                    disabled={showOTPInput}
                  >
                    Verify Email
                  </button>
                </div>
              )}
              {showOTPInput && (
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
              {showOTPInput && (
                <div className="px-2 py-3 md:w-1/2 m-auto">
                  <button
                    type="submit"
                    className="w-1/2 border rounded-full border-slate-500 p-3 text-black disabled:cursor-not-allowed"
                    disabled={!isValidOtp}
                  >
                    Verify OTP/Register
                  </button>
                </div>
              )}
            </div>
          </form>
          <p className="font-sans text-sm sm:text-base text-black">
            <span>Already have an account? </span>
            <Link className="text-blue-800 underline pt-2 pl-1" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
