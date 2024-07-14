import React, { useState, useRef } from "react";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { useSelector } from "react-redux";
import axios from "axios";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddDish() {
  const [dishName, setDishName] = useState("");
  const [dishAmount, setDishAmount] = useState("");
  const [dishType, setDishType] = useState("Veg");
  const [dishDescription, setDishDescription] = useState("");
  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [showDishButton, setShowDishButton] = useState(true);

  const [enableAddButton, setEnableAddButton] = useState();
  const [productImgPublicId, setProductImgPublicId] = useState("");
  const [producttImgUrl, setProductImgImgUrl] = useState("");
  const imgRef = useRef();

  const navigate = useNavigate();

  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );

  const jwtToken = Cookies.get("jwtToken");

  const [handleFormErrors, setHandleFormErrors] = useState({
    dishNameError: false,
    dishAmountError: false,
    dishDescriptionError: false,
  });

  const checkFormValidation = () => {
    let errors = {};

    if (!dishName) errors.dishNameError = true;
    if (!dishAmount) errors.dishAmountError = true;
    if (!dishDescription) errors.dishDescriptionError = true;

    setHandleFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleDishTypeChange = (event) => {
    setDishType(event.target.value);
  };

  const handleImgChange = async (event) => {
    // setServerError(false);

    setShowDishButton(false);

    const imgFile = event.target.files[0];

    const formData = new FormData();
    formData.append("restaurantName", restaurantData.name);
    formData.append("dishImg", imgFile);

    if (productImgPublicId) {
      formData.append("oldImgPublicId", productImgPublicId);
    }

    try {
      const response = await axios.post(
        `${configVariables.ipAddress}/dishes/uploadDishImg`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setProductImgPublicId(response.data.data.public_id);
        setProductImgImgUrl(response.data.data.url);
        setShowDishButton(true);
        // setShowNextButton(true);
      }
    } catch (error) {
      console.log("Uploading product image :: Error ", error);
      // setServerError(true);
      // setServerErrorMessage(error.response.data.message);
    }
  };

  const handleImgClick = () => {
    const isFormErrors = checkFormValidation();
    if (!isFormErrors) return;
    // setEnableAddButton();
    imgRef.current.click();
    setServerError(false);
  };

  const handleAddDish = async (e) => {
    e.preventDefault();

    let isFormValid = checkFormValidation();
    if (!isFormValid) return;

    const body = {
      dishName,
      amount: dishAmount,
      description: dishDescription,
      dishImageURL: producttImgUrl,
      dishImagePublicId: productImgPublicId,
      restaurantId: restaurantData._id,
      typeOfDish: dishType,
      restaurantName: restaurantData.name,
    };

    try {
      const response = await axios.post(
        `${configVariables.ipAddress}/dishes/createDish`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Dish Added Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/partner-menu");
        }, 2000);
      }
    } catch (error) {
      console.log("Partner :: AddDish :: Error: ", error);
      if (error.response.status >= 201) {
        setServerError(true);
        setServerErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="px-10 pb-8 mb-12 sm:mb-0 flex justify-center  min-w-fit">
      <ToastContainer />
      <div className="border border-slate-500 rounded-2xl shadow-xl p-5 w-4/5 md:h-3/4 md:w-3/4 ">
        <form
          className="flex flex-col md:flex-row text-black dark:text-white"
          onSubmit={handleAddDish}
        >
          <div className="w-full md:w-1/2">
            <div className="space-y-1">
              <label className=" text-md font-bold " htmlFor="dishName">
                Dish name
              </label>
              <input
                placeholder="Dish Name"
                id="dishName"
                type="text"
                value={dishName}
                className="p-2 w-full rounded-xl text-sm focus:outline-none bg-gray-50 border border-slate-500  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setDishName(e.target.value)}
              />
              {handleFormErrors.dishNameError && (
                <span className="text-red-500 text-xs md:text-sm">
                  *Name is mandatory
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-md font-bold" htmlFor="amount">
                Amount
              </label>
              <input
                placeholder="Amount"
                id="amount"
                type="number"
                value={dishAmount}
                className="p-2 w-full rounded-xl    text-sm focus:outline-none bg-gray-50 border border-slate-500  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 no-spinner"
                onChange={(e) => setDishAmount(e.target.value)}
              />
              {handleFormErrors.dishAmountError && (
                <span className="text-red-500 text-xs md:text-sm">
                  *Amount is mandatory
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-md font-bold">Type</label>
              <div className="flex">
                <div className="flex items-center">
                  <input
                    id="veg"
                    name="foodType"
                    type="radio"
                    value="Veg"
                    checked={dishType === "Veg"}
                    onChange={handleDishTypeChange}
                    className="p-2 border rounded-xl focus:outline-none border-slate-500 text-black text-sm no-spinner"
                  />
                  <label htmlFor="veg" className="ml-2 text-sm">
                    Veg
                  </label>
                </div>
                <div className="flex items-center ml-5">
                  <input
                    id="non-veg"
                    name="foodType"
                    type="radio"
                    value="Non-Veg"
                    checked={dishType === "Non-Veg"}
                    onChange={handleDishTypeChange}
                    className="p-2 border rounded-xl focus:outline-none border-slate-500 text-black text-sm no-spinner"
                  />
                  <label htmlFor="non-veg" className="ml-2 text-sm">
                    Non-Veg
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="description" className="text-md font-bold">
                Description
              </label>
              <textarea
                onChange={(e) => setDishDescription(e.target.value)}
                rows={5}
                value={dishDescription}
                id="description"
                className="p-2 w-full rounded-xl    text-sm focus:outline-none bg-gray-50 border border-slate-500  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {handleFormErrors.dishDescriptionError && (
              <span className="text-red-500 text-xs md:text-sm">
                *Description is mandatory
              </span>
            )}
          </div>
          <div className="w-full md:w-1/2 md:ml-5">
            <div
              className="relative z-0 w-full mb-5 mt-3 group flex justify-center"
              // onClick={handleImgClick}
            >
              <input
                ref={imgRef}
                id="addingImage"
                className="hidden"
                type="file"
                onChange={handleImgChange}
              />
              {producttImgUrl && (
                <div className="relative h-36 w-36">
                  <img
                    src={producttImgUrl}
                    className="h-36 w-36 rounded-xl disabled:cursor-not-allowed border border-slate-500 shadow-2xl"
                  />
                  <button
                    type="button"
                    onClick={handleImgClick}
                    className="absolute px-1 bg-black text-white dark:bg-white dark:text-black text-sm border border-slate-500 rounded-lg bottom-2 right-2"
                  >
                    <ModeTwoToneIcon />
                  </button>
                </div>
              )}
              {!producttImgUrl && (
                <button
                  type="button"
                  onClick={handleImgClick}
                  className="h-36 w-36 border rounded-xl border-slate-500 flex items-center justify-center disabled:cursor-not-allowed text-4xl"
                >
                  <span>
                    <span>+</span>

                    <span className="text-sm block">Add Image</span>
                  </span>
                </button>
              )}
            </div>
            {serverError && (
              <p className="text-red-500 text-sm md:text-md pt-1 px-2 text-center">
                {serverErrorMessage}
              </p>
            )}
            {showDishButton && (
              <div className="flex items-center justify-center md:mt-10">
                <button
                  className="rounded-lg border border-slate-500 px-4 py-2"
                  type="submit"
                >
                  Add Dish
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDish;
