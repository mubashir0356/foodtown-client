import React, { useState } from "react";
import axios from "axios";
import navImage from "../../../../public/assets/image1.jpeg";
import configVariables from "../../../configurations/config";
import Cookies from "js-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");

  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleEmailOrMobileChange = (event) =>
    setEmailOrMobile(event.target.value.toLowerCase());

  const handlePassword = (event) => setPassword(event.target.value);

  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwtToken");

  const [formError, setFormError] = useState({
    emailOrMobileError: false,
    passwordError: false,
  });

  const validateFields = () => {
    const errors = {};

    if (!emailOrMobile) errors.emailOrMobileError = true;
    if (!password) errors.passwordError = true;

    setFormError(errors);

    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isValid = validateFields();

    if (!isValid) return;

    const body = {
      emailOrMobile,
      password,
    };

    try {
      const response = await axios.post(
        `${configVariables.ipAddress}/users/login`,
        body
      );

      if (response.status === 200) {
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const resCookie = Cookies.get("accessToken");
        Cookies.set("jwtToken", response.data.data.accessToken, { expires: 1 });
        Cookies.set("userId", response.data.data.loggedInUser._id, {
          expires: 1,
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Error while logging in", error);

      if (error.response && error.response.status > 201) {
        setServerError(true);
        setServerErrorMessage(error.response.data.message);
      }
    }
  };

  if (jwtToken) {
    return <Navigate to="/" />;
  }

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div
        className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat bg-overlay -mt-6"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="flex items-center justify-center min-h-screen pb-24">
          <div className="relative flex justify-center border border-slate-500 rounded-2xl p-3 min-h-[420px] min-w-96 shadow-2xl mt-36">
            <div className="absolute -top-16 flex flex-col space-y-2 min-h-full">
              <div className="flex items-center justify-center">
                <img
                  src={navImage}
                  alt="food-town-logo"
                  className="h-32 w-32 border rounded-full"
                />
              </div>

              <form className="space-y-2 font-sans" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label
                    className={`${
                      formError.emailOrMobileError
                        ? "text-red-500"
                        : "text-black"
                    } text-xl font-bold`}
                    htmlFor="email"
                  >
                    Email/Mobile
                  </label>
                  <input
                    onChange={handleEmailOrMobileChange}
                    type="text"
                    value={emailOrMobile}
                    className="w-full p-2 text-black border border-slate-800 rounded-lg focus:outline-none m-y-2"
                    id="email"
                    placeholder="Enter your email/mobile"
                  />
                </div>
                {formError.emailOrMobileError && (
                  <span className="text-red-500 text-xs md:text-sm">
                    *This field is mandatory
                  </span>
                )}
                <div className="space-y-2">
                  <label
                    className={`${
                      formError.passwordError ? "text-red-500" : "text-black"
                    } text-xl font-bold`}
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      onChange={handlePassword}
                      value={password}
                      type={showPassword ? "text" : "password"}
                      className={`w-full p-2 text-black border ${
                        formError.passwordError
                          ? "border-red-500"
                          : "border-slate-800"
                      } rounded-lg focus:outline-none m-y-2`}
                      id="password"
                      placeholder="Enter your password"
                    />
                    <div
                      className="absolute right-2 cursor-pointer"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? (
                        <VisibilityOffRoundedIcon sx={{ color: "black" }} />
                      ) : (
                        <VisibilityRoundedIcon sx={{ color: "black" }} />
                      )}
                    </div>
                  </div>
                </div>
                {formError.passwordError && (
                  <span className="text-red-500 text-xs md:text-sm">
                    *Password is mandatory
                  </span>
                )}
                <br />
                {serverError && (
                  <p className="text-red-500 text-sm md:text-md py-0">
                    {serverErrorMessage}
                  </p>
                )}
                <div className="text-center">
                  <button
                    type="submit"
                    className="p-2 text-center border border-slate-800 w-1/2 rounded-full text-black"
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="font-sans text-sm sm:text-base text-black">
                <span>New to FOOD TOWN? </span>
                <Link
                  className="text-blue-800 underline pt-2 pl-1"
                  to="/register"
                >
                  Create an account
                </Link>
              </p>
              <p className="font-sans text-sm sm:text-base text-black">
                <span>Own a Restaurant? </span>
                <Link
                  className="text-blue-800 underline pt-2 pl-1"
                  to="/partner-registration"
                >
                  Be our Partner
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
