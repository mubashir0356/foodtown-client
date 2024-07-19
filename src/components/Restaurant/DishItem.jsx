import React, { useState, useEffect } from "react";
import ChangeHistoryTwoToneIcon from "@mui/icons-material/ChangeHistoryTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import axios from "axios";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { loadBagData } from "../../store/bagSlice";

function DishItem(props) {
  const { dish, restaurantId } = props;
  const jwtToken = Cookies.get("jwtToken");

  const dispatch = useDispatch();

  const bag = useSelector((state) => state.bag?.bagData);

  const bagDishes = bag?.dishes?.map((each) => each.dishId);

  const [showAddButton, setShowAddButton] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const [handleAddButton, setHandleAddButton] = useState(true);

  useEffect(() => {
    if (bagDishes?.includes(dish._id)) {
      if (handleAddButton) {
        setShowAddButton(false);
      }
      setQuantity(findQuantity(dish._id));
    }
  }, [bagDishes, dish._id]);

  const findQuantity = (dishId) => {
    const dish = bag?.dishes?.find((each) => each.dishId === dishId);
    return dish ? dish.quantity : 0;
  };

  const handleAddDishInBag = async (dishId, dishAmount) => {
    const userId = Cookies.get("userId");
    try {
      const response = await axios.get(
        `${configVariables.ipAddress}/bags/checkBag/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      const { currentRestaurantId } = response.data.data;

      if (currentRestaurantId && currentRestaurantId !== restaurantId) {
        //TODO: popup for differant restaurant in bag
        if (
          window.confirm(
            "You have items in your bag from another restaurant. Do you want to clear them and add this dish?"
          )
        ) {
          await axios.delete(
            `${configVariables.ipAddress}/bags/clearBag/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
              withCredentials: true,
            }
          );
        } else {
          return;
        }
      }

      const addResponse = await axios.post(
        `${configVariables.ipAddress}/bags/addBag/${restaurantId}`,
        { dishId, dishAmount },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (addResponse.status === 200) {
        setShowAddButton(false);
        dispatch(loadBagData());
      }
    } catch (error) {
      console.log("Dish Item :: handleAddDishInBag :: Error:", error);
    }
  };

  const increaseDishQuantity = async (dishId) => {
    try {
      const response = await axios.put(
        `${configVariables.ipAddress}/bags/incrementDishQuantity`,
        { dishId, restaurantId },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );
      // console.log(response, "inc");
      if (response.status === 200) {
        dispatch(loadBagData());
      }
    } catch (error) {
      console.log("Dish Item :: handleAddDishInBag :: Error:", error);
    }
  };

  const decreaseDishQuantity = async (dishId) => {
    try {
      const response = await axios.put(
        `${configVariables.ipAddress}/bags/decrementDishQuantity`,
        { dishId, restaurantId },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );
      // console.log(response, "dec");
      if (response.status === 200) {
        dispatch(loadBagData());
        if (
          !response.data?.data?.dishes?.some((dish) => dish.dishId === dishId)
        ) {
          setHandleAddButton(false);
          setShowAddButton(true);
        }
      }
    } catch (error) {
      console.log("Dish Item :: handleAddDishInBag :: Error:", error);
    }
  };

  return (
    <li className="flex flex-col md:flex-row justify-between p-2 pt-4 mb-2 sm:mb-4">
      <div className="flex w-full">
        <div className="w-1/2  sm:w-3/4">
          {dish.typeOfDish === "Veg" ? (
            <div className="items-center hidden sm:flex">
              <span className="border-2 border-green-700  text-center rounded-md p-[1px] flex justify-center items-center w-6 h-6">
                <FiberManualRecordIcon
                  fontSize="small"
                  sx={{ color: "green" }}
                />
              </span>
              <p className="ml-2">Veg</p>
            </div>
          ) : (
            <div className="items-center hidden sm:flex">
              <span className="border-2 border-red-500  text-center rounded-md p-[1px] flex justify-center items-center w-6 h-6">
                <ChangeHistoryTwoToneIcon
                  fontSize="small"
                  sx={{ color: "#ef4444" }}
                />
              </span>
              <p className="ml-2 ">Non Veg</p>
            </div>
          )}
          <h1 className="py-1 font-bold text-md md:text-xl ">
            {dish.dishName}
            <span className="ml-2 font-normal text-sm md:hidden">
              ({dish.typeOfDish === "Veg" ? "Veg" : "Non-Veg"})
            </span>
          </h1>
          <p className="flex items-center text-slate-800 dark:text-slate-300 text-xs md:text-md">
            <CurrencyRupeeIcon fontSize="small" />
            {dish.amount}/-
          </p>
          <div className="flex items-center gap-1 font-semibold py-2">
            <StarsRoundedIcon fontSize="small" sx={{ color: "green" }} />
            <p className="text-xs md:text-md">4 (504)</p>
          </div>
          <p className="text-slate-800 dark:text-slate-400 line-clamp-2 hidden md:block">
            {dish.description}
          </p>
        </div>
        <div className="w-1/2 h-24 sm:h-36 sm:w-1/4 relative ">
          <img
            className="w-full h-full rounded-lg"
            src={dish.dishImage.url}
            alt="Dish Image"
          />
          {showAddButton ? (
            <button
              onClick={() => handleAddDishInBag(dish._id, dish.amount)}
              className="absolute text-white dark:text-black font-bold -bottom-4 left-1/2 px-3 py-1 sm:px-6 sm:py-2 -translate-x-1/2 rounded-lg m-0 border border-slate-500 bg-black dark:bg-white"
            >
              Add
            </button>
          ) : (
            <div className="flex absolute text-white dark:text-black font-bold -bottom-4 left-1/2 -translate-x-1/2 rounded-xl m-0 border border-slate-500 bg-black dark:bg-white">
              <button
                onClick={() => decreaseDishQuantity(dish._id)}
                className="bg-slate-500 rounded-l-md px-2 py-1 sm:px-3 sm:py-2"
              >
                -
              </button>
              <p className="px-3 py-1 sm:px-4 sm:py-2">{quantity}</p>
              <button
                onClick={() => increaseDishQuantity(dish._id)}
                className="bg-slate-500 rounded-r-md px-2 py-1 sm:px-3 sm:py-2"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="line-clamp-2 w-full md:hidden bg-slate-400 p-2 rounded-lg mt-6">
        {dish.description}
      </p>
    </li>
  );
}

export default DishItem;
