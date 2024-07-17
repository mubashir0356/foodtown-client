import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import configVariables from "../../configurations/config";
import { useSelector } from "react-redux";

function EditDish({ open, handleClose, dish, fetchDishes }) {
  const [dishName, setDishName] = useState(dish.dishName);
  const [amount, setAmount] = useState(dish.amount);
  const [description, setDescription] = useState(dish.description);
  const [productImgPublicId, setProductImgPublicId] = useState(
    dish.dishImage.publicID
  );
  const [producttImgUrl, setProductImgImgUrl] = useState(dish.dishImage.url);
  const imgRef = useRef(null);

  const restaurantData = useSelector(
    (state) => state.restaurant?.restaurantData
  );

  // const [showDishButton, setShowDishButton] = useState(true);

  const jwtToken = Cookies.get("jwtToken");

  const handleImgClick = () => {
    imgRef.current.click();
  };

  const handleImgChange = async (event) => {
    // setShowDishButton(false);

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
        // setShowDishButton(true);
        // setShowNextButton(true);
      }
    } catch (error) {
      console.log("Uploading dish image :: Error ", error);
      // setServerError(true);
      // setServerErrorMessage(error.response.data.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const body = {
      dishName,
      amount,
      description,
      productImgPublicId,
      producttImgUrl,
    };

    try {
      await axios.put(
        `${configVariables.ipAddress}/dishes/updateDish/${dish._id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      fetchDishes();
      handleClose();
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  useEffect(() => {
    setDishName(dish.dishName);
    setAmount(dish.amount);
    setDescription(dish.description);
    // setProductImgImgUrl(dish.dishImage.url);
  }, [dish]);

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white dark:bg-gray-800 border border-slate-500 rounded-2xl shadow-xl p-5 w-4/5 md:h-3/4 md:w-3/4 overflow-y-auto max-h-screen">
          <form className="flex flex-col md:flex-row" onSubmit={handleSave}>
            <div className="w-full md:w-1/2">
              <div className="space-y-1">
                <label
                  className="text-black dark:text-white text-md font-bold"
                  htmlFor="dishName"
                >
                  Dish name
                </label>
                <input
                  placeholder="Dish Name"
                  id="dishName"
                  type="text"
                  value={dishName}
                  className="p-2 w-full border rounded-xl focus:outline-none border-slate-500 text-black dark:text-white dark:bg-gray-700 text-sm"
                  onChange={(e) => setDishName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label
                  className="text-black dark:text-white text-md font-bold"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <input
                  placeholder="Amount"
                  id="amount"
                  type="number"
                  value={amount}
                  className="p-2 w-full border rounded-xl focus:outline-none border-slate-500 text-black dark:text-white dark:bg-gray-700 text-sm"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="description"
                  className="text-black dark:text-white text-md font-bold"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  value={description}
                  id="description"
                  className="p-2 w-full border rounded-xl border-slate-500 text-black dark:text-white dark:bg-gray-700 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 md:ml-5 my-2">
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
                      className="absolute px-1 bg-black text-white text-sm border border-slate-500 rounded-lg bottom-2 right-2"
                    >
                      Edit
                    </button>
                  </div>
                )}
                {!producttImgUrl && (
                  <button
                    type="button"
                    onClick={handleImgClick}
                    className="h-36 w-36 border rounded-xl border-slate-500 flex items-center justify-center text-black dark:text-white dark:bg-gray-700 disabled:cursor-not-allowed text-4xl"
                  >
                    <span>
                      <span>+</span>
                      <span className="text-sm block">Add Image</span>
                    </span>
                  </button>
                )}
              </div>
              <div className="flex items-center justify-center md:mt-10 space-x-4">
                <button
                  className="text-black dark:text-white rounded-lg border border-slate-500 px-4 py-2"
                  type="submit"
                >
                  Save Dish
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-black dark:text-white rounded-lg border border-slate-500 px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default EditDish;
