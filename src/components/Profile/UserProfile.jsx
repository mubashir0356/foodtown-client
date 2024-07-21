import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "@mui/material";
import axios from "axios";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../store/userSlice";

function UserProfile() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [address, setAddress] = useState("");

  const jwtToken = Cookies.get("jwtToken");

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user?.userData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const [formErrors, setFormErrors] = useState({
    nameError: false,
    mobileError: false,
  });

  const isValidateForm = () => {
    const errors = {};
    if (!name) errors.nameError = true;
    if (!mobile) errors.mobileError = true;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();

    const validate = isValidateForm();
    if (!validate) return;

    try {
      const body = {
        name,
        mobile,
      };
      const response = await axios.post(
        `${configVariables.ipAddress}/users/updateUserProfile/`,
        body,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Profile updated Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(response);
        const updatedUserData = response.data.data;
        dispatch(login(updatedUserData));
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.log("User Profile :: handleProfileSave :: Error:", error);
      if (error.response?.status > 201) {
        setServerError(true);
        setServerErrorMessage(error.response.data.message);
      }
    }
  };

  const handleAddress = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${configVariables.ipAddress}/users/addAddress/`,
        { address },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Address updated Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(response);
        const updatedUserData = response.data.data;
        dispatch(login(updatedUserData));
        setOpenAddressModal(false);
      }
    } catch (error) {
      console.log("User Profile :: handleProfileSave :: Error:", error);
      if (error.response?.status > 201) {
        // setServerError(true);
        // setServerErrorMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setMobile(userData.mobile);

      setAddress(userData.address);
    }
  }, [userData]);

  return (
    userData && (
      <div className="border border-slate-400 rounded-lg shadow-xl w-[90%] md:w-3/4 m-auto mt-4 px-2 py-3 bg-cyan-50 dark:bg-slate-700">
        <ToastContainer />
        <div className="flex flex-col sm:flex-row justify-between mt-5 sm:my-5 ml-5">
          <div className="font-bold">
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Mobile: {userData.mobile}</p>
          </div>
          <div className="flex flex-row sm:flex-col justify-between mt-2 sm:mt-0">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="border border-slate-400 bg-cyan-300 px-2 py-2 dark:text-black rounded-lg font-bold mb-2 shadow-md"
            >
              Edit profile
            </button>

            <button
              onClick={() => setOpenAddressModal(true)}
              className="border border-slate-400 bg-cyan-300 px-2 py-2 dark:text-black rounded-lg font-bold mb-2 shadow-md"
            >
              {userData.address ? "Edit Address" : "Add Address"}
            </button>
          </div>
        </div>
        {userData.address && (
          <div>
            <h1 className="font-bold underline text-lg">Address</h1>
            <p className="border border-slate-300 p-5 w-full sm:w-1/2 bg-white rounded-xl mt-2 dark:bg-slate-600">
              {userData.address}
            </p>
          </div>
        )}

        <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 border border-slate-500 rounded-2xl shadow-xl p-5 w-4/5 md:h-3/4 sm:w-1/2 md:w-[30%] overflow-y-auto max-h-screen">
              <form
                className="flex flex-col md:flex-row"
                onSubmit={handleProfileSave}
              >
                <div className="w-full space-y-4">
                  <div className="space-y-1">
                    <label
                      className={`${
                        formErrors.nameError ? "text-red-500" : "text-black"
                      } dark:text-white text-md font-bold`}
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      placeholder="Enter your name"
                      id="name"
                      type="text"
                      value={name}
                      className={`${
                        formErrors.nameError
                          ? "border-red-500"
                          : "border-slate-500"
                      } p-2 w-full border rounded-xl focus:outline-none text-black dark:text-white dark:bg-gray-700 text-sm`}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {formErrors.nameError && (
                    <span className="text-red-500 text-xs md:text-sm">
                      *Name is mandatory
                    </span>
                  )}
                  <div className="space-y-1">
                    <label
                      className="text-black dark:text-white text-md font-bold"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      placeholder="Enter your email"
                      id="email"
                      type="email"
                      value={userData.email}
                      className="border-slate-500 p-2 w-full border rounded-xl focus:outline-none text-black dark:text-white dark:bg-gray-700 text-sm cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      className={`${
                        formErrors.mobileError ? "text-red-500" : "text-black"
                      } dark:text-white text-md font-bold`}
                      htmlFor="mobile"
                    >
                      Mobile
                    </label>
                    <input
                      placeholder="Enter your mobile number"
                      id="mobile"
                      type="number"
                      value={mobile}
                      className={`${
                        formErrors.mobileError
                          ? "border-red-500"
                          : "border-slate-500"
                      } p-2 w-full border rounded-xl focus:outline-none text-black dark:text-white dark:bg-gray-700 text-sm no-spinner`}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  {formErrors.mobileError && (
                    <span className="text-red-500 text-xs md:text-sm">
                      *Mobile number is mandatory
                    </span>
                  )}
                  {serverError && (
                    <span className="text-red-500 text-xs md:text-sm">
                      {serverErrorMessage}
                    </span>
                  )}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="border border-slate-400 px-3 py-2 rounded-lg dark:text-white font-bold"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      cancel
                    </button>
                    <button
                      type="submit"
                      className="border border-slate-400 px-3 py-2 rounded-lg dark:text-white font-bold"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <Modal
          open={openAddressModal}
          onClose={() => setOpenAddressModal(false)}
        >
          <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 border border-slate-500 rounded-2xl shadow-xl p-5 w-4/5 md:h-3/4 sm:w-1/2 md:w-[30%] overflow-y-auto max-h-screen">
              <form
                className="flex flex-col space-y-2"
                onSubmit={handleAddress}
              >
                <div className="space-y-1">
                  <label
                    htmlFor="address"
                    className="text-black dark:text-white text-md font-bold"
                  >
                    Add address
                  </label>
                  <textarea
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    rows={5}
                    value={address}
                    placeholder={`Door Number, \nStreet name, \nCity, \nState, \nPincode`}
                    id="address"
                    className="p-2 w-full border rounded-xl border-slate-500 text-black dark:text-white dark:bg-gray-700 text-sm focus:outline-none"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="border border-slate-400 px-3 py-2 rounded-lg dark:text-white font-bold"
                    onClick={() => setOpenAddressModal(false)}
                  >
                    cancel
                  </button>
                  <button
                    type="submit"
                    className="border border-slate-400 px-3 py-2 rounded-lg dark:text-white font-bold"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    )
  );
}

export default UserProfile;
