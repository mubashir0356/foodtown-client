import axios from "axios";
import React, { useState } from "react";
import configVariables from "../../../configurations/config";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

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
    } catch (error) {
      console.log("Error while register:", error);
      if (error.response.status > 201) {
        setServerError(true);
        setServerErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat bg-overlay"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="flex items-center justify-center min-h-screen pb-24">
        <div className="relative flex flex-col p-3 w-96 border border-slate-500 rounded-2xl shadow-2xl mt-36">
          <div className="absolute self-center -top-16">
            <img
              src="/image1.jpeg"
              alt=""
              className="h-32 w-32 rounded-full "
            />
          </div>
          <form
            className="mt-16 text-sans space-y-3"
            onSubmit={handleRegistration}
          >
            <div className="space-y-1">
              <label className="text-black text-md font-bold" htmlFor="name">
                Name
              </label>
              <input
                placeholder="Full name"
                id="name"
                type="text"
                className="p-2 w-full border border-slate-500 rounded-xl focus: outline-none invalid:border-red-500 text-black text-sm"
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && (
                <span className="text-red-500 text-xs md:text-sm">
                  *Name is mandatory
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-black text-md font-bold" htmlFor="email">
                Email
              </label>
              <input
                placeholder="example@example.com"
                id="email"
                type="email"
                className="p-2 w-full border border-slate-500 rounded-xl focus: outline-none invalid:border-red-500 text-black text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.email && (
                <span className="text-red-500 text-xs md:text-sm">
                  *Email is mandatory
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-black text-md font-bold" htmlFor="mobile">
                Mobile
              </label>
              <input
                placeholder="Mobile number"
                id="mobile"
                type="number"
                className="p-2 w-full border border-slate-500 rounded-xl focus: outline-none invalid:border-red-500 text-black text-sm no-spinner"
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
                className="text-black text-md font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                placeholder="Set your password"
                id="password"
                type="password"
                className="p-2 w-full border border-slate-500 rounded-xl focus: outline-none invalid:border-red-500 text-black text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
              {formErrors.password && (
                <span className="text-red-500 text-xs md:text-sm">
                  *Password is mandatory
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label
                className="text-black text-md font-bold"
                htmlFor="confirm-password"
              >
                Confirm password
              </label>
              <input
                placeholder="Confirm your password"
                id="confirm-password"
                type="password"
                className="p-2 w-full border border-slate-500 rounded-xl focus: outline-none invalid:border-red-500 text-black text-sm"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {formErrors.confirmPassword && (
                <span className="text-red-500 text-xs md:text-sm">
                  *Password doesn't match
                </span>
              )}
            </div>
            <div className="py-3 text-center">
              <button
                type="submit"
                className="w-1/2 border rounded-full border-slate-500 p-3"
              >
                Register
              </button>
            </div>
            {serverError && (
              <p className="text-red-500 text-sm md:text-md text-center">
                {serverErrorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
