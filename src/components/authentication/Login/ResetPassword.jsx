import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisterImg from "../../../../public/assets/image1.jpeg";
import configVariables from "../../../configurations/config";
import { Link, Navigate, useNavigate } from "react-router-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat bg-overlay -mt-6 flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <ToastContainer />
      <div className="relative flex flex-col p-3 w-96 border border-slate-500 rounded-2xl shadow-2xl">
        <div className="absolute self-center -top-16">
          <img src={RegisterImg} alt="" className="h-32 w-32 rounded-full " />
        </div>
        <div className="">
          {/*
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
                )} */}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
