import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import navImage from "../../../../public/assets/image1.jpeg";
import Cookies from "js-cookie";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RestaurantDetails from "./RestaurantDetails";
import PartnerOTP from "./PartnerOTP";
import configVariables from "../../../configurations/config";
import StepperComp from "../../utilities/StepperComp";

function PartnerRegister() {
  const jwtToken = Cookies.get("jwtToken");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const [showForm, setShowForm] = useState("owner");

  const [activeStep, setActiveStep] = useState(0);

  const [ownerFormErrors, setOwnerFormErrors] = useState({
    name: false,
    mobile: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateOwnerForm = () => {
    const errors = {};

    if (!name) errors.name = true;
    if (!mobile) errors.mobile = true;
    if (!email) errors.email = true;
    if (!password) errors.password = true;
    if (password !== confirmPassword) errors.confirmPassword = true;

    setOwnerFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const registerOwner = async (e) => {
    e.preventDefault();

    const isFormValid = validateOwnerForm();
    if (!isFormValid) return;

    const body = {
      name,
      email,
      password,
      mobile,
    };

    try {
      const response = await axios.post(
        `${configVariables.ipAddress}/users/validate-user`,
        body
      );

      if (response.status <= 201) {
        if (activeStep < 3) setActiveStep(activeStep + 1);
        setShowForm("restaurant");
      }
    } catch (error) {
      console.log("Owner details :: partner registration :: error: ", error);
      setServerError(true);
      setServerErrorMessage(error.response.data.message);
    }
  };

  const handleBack = (formName) => {
    if (formName === "restaurant") setShowForm("owner");
    if (formName === "otp") setShowForm("restaurant");
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const handleRestaurantNext = () => {
    setActiveStep(2);
    setShowForm("otp");
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
      <StepperComp step={activeStep} />
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen pb-24 pt-14">
        <div className="relative flex flex-col p-3 w-96 border border-slate-500 rounded-2xl shadow-2xl mt-36 md:w-3/5">
          <div className="absolute self-center -top-16">
            <img src={navImage} alt="" className="h-32 w-32 rounded-full " />
          </div>
          {showForm === "owner" && (
            <>
              <form
                className="mt-16 text-sans space-y-3 md:space-y-0 flex flex-wrap"
                onSubmit={registerOwner}
              >
                <div className="w-full md:w-1/2 px-2">
                  <div className="space-y-1">
                    <label
                      className={`${
                        ownerFormErrors.name ? "text-red-500" : "text-black"
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
                        ownerFormErrors.name
                          ? "border-red-500"
                          : "border-slate-500"
                      } text-black text-sm`}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {ownerFormErrors.name && (
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
                        ownerFormErrors.email ? "text-red-500" : "text-black"
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
                        ownerFormErrors.email
                          ? "border-red-500"
                          : "border-slate-500"
                      } text-black text-sm`}
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                    {ownerFormErrors.email && (
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
                        ownerFormErrors.mobile ? "text-red-500" : "text-black"
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
                        ownerFormErrors.mobile
                          ? "border-red-500"
                          : "border-slate-500"
                      } text-black text-sm`}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    {ownerFormErrors.mobile && (
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
                        ownerFormErrors.password ? "text-red-500" : "text-black"
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
                          ownerFormErrors.password
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
                    {ownerFormErrors.password && (
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
                        ownerFormErrors.confirmPassword
                          ? "text-red-500"
                          : "text-black"
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
                          ownerFormErrors.confirmPassword
                            ? "border-red-500"
                            : "border-slate-500"
                        } text-black text-sm`}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <div
                        className="absolute right-2 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffRoundedIcon sx={{ color: "black" }} />
                        ) : (
                          <VisibilityRoundedIcon sx={{ color: "black" }} />
                        )}
                      </div>
                    </div>
                    {ownerFormErrors.confirmPassword && (
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
                  <div className="px-2 py-3 w-1/2 m-auto">
                    <button
                      type="submit"
                      className="w-full md:w-1/2 border rounded-full border-slate-500 p-3 text-black"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>

              <p className="font-sans text-sm sm:text-base text-black">
                <span>Already have an account? </span>
                <Link className="text-blue-800 underline pt-2 pl-1" to="/login">
                  Login
                </Link>
              </p>
            </>
          )}
          {showForm === "restaurant" && (
            <RestaurantDetails
              onBack={handleBack}
              onNext={handleRestaurantNext}
            />
          )}
          {showForm === "otp" && (
            <PartnerOTP
              onBack={handleBack}
              email={email}
              name={name}
              mobile={mobile}
              password={password}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PartnerRegister;
