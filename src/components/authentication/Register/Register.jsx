import axios from "axios";
import React, { useState } from "react";
import configVariables from "../../../configurations/config";
import { Link, Navigate, useNavigate } from "react-router-dom";
import RegisterImg from "../../../../public/assets/image1.jpeg";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import Cookies from "js-cookie";

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

  const jwtToken = Cookies.get("jwtToken");

  const [formErrors, setFormErrors] = useState({
    name: false,
    mobile: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

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

  const handleRegistration = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();
    if (!isFormValid) return;
    // if (!validateForm()) return;

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
        navigate("/login");
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
      <div className="flex items-center justify-center min-h-screen pb-24">
        <div className="relative flex flex-col p-3 w-96 border border-slate-500 rounded-2xl shadow-2xl mt-36">
          <div className="absolute self-center -top-16">
            <img src={RegisterImg} alt="" className="h-32 w-32 rounded-full" />
          </div>
          <form
            className="mt-16 text-sans space-y-3"
            onSubmit={handleRegistration}
          >
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
                className={`p-2 w-full border rounded-xl focus: outline-none invalid:border-red-500 text-black text-sm ${
                  formErrors.name ? "border-red-500" : "border-slate-500"
                }`}
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && (
                <span className="text-red-500 text-xs md:text-sm">
                  *Name is mandatory
                </span>
              )}
            </div>
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
                className={`p-2 w-full border rounded-xl focus: outline-none invalid:border-red-500 text-black text-sm ${
                  formErrors.email ? "border-red-500" : "border-slate-500"
                }`}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
              {formErrors.email && (
                <span className="text-red-500 text-xs md:text-sm">
                  *Email is mandatory
                </span>
              )}
            </div>
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
                className={`p-2 w-full border ${
                  formErrors.mobile ? "border-red-500" : "border-slate-500"
                } rounded-xl focus: outline-none invalid:border-red-500 text-black text-sm no-spinner`}
                onChange={(e) => setMobile(e.target.value)}
              />
              {formErrors.mobile && (
                <span className="text-red-500 text-xs md:text-sm">
                  *Mobile number is mandatory
                </span>
              )}
            </div>
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
                  className={`p-2 w-full border rounded-xl focus: outline-none invalid:border-red-500 text-black text-sm ${
                    formErrors.password ? "border-red-500" : "border-slate-500"
                  }`}
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
                  className={`p-2 w-full border rounded-xl focus: outline-none invalid:border-red-500 text-black text-sm ${
                    formErrors.confirmPassword
                      ? "border-red-500"
                      : "border-slate-500"
                  }`}
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

            {serverError && (
              <p className="text-red-500 text-sm md:text-md py-0">
                {serverErrorMessage}
              </p>
            )}
            <div className="py-3 text-center">
              <button
                type="submit"
                className="w-1/2 border rounded-full border-slate-500 p-3 text-black"
              >
                Register
              </button>
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
