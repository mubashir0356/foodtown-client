import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import configVariables from "../../configurations/config";
import DishItem from "../Restaurant/DishItem";
import { loadStripe } from "@stripe/stripe-js";
import EmptyBag from "../../../public/assets/grocery-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { loadBagData } from "../../store/bagSlice";

function Bag() {
  const [bagDishes, setBagDishes] = useState([]);
  const bagData = useSelector((state) => state.bag?.bagData);
  const bagDataDishIds = bagData?.dishes?.map((each) => each.dishId.toString());
  const [orderAmount, setOrderAmount] = useState(0);

  const userData = useSelector((state) => state.user?.userData);
  const dispatch = useDispatch();

  const restaurantId = bagData?.restaurantId;

  const jwtToken = Cookies.get("jwtToken");
  const userId = Cookies.get("userId");

  const navigate = useNavigate();

  const fetchBagDishes = async () => {
    try {
      const dishIds = bagDataDishIds?.join(",");
      if (dishIds) {
        const response = await axios.get(
          `${configVariables.ipAddress}/bags/getBagDishes/${dishIds}`,
          // {bagDataDishIds},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setBagDishes(response.data.data);
        }
      }
    } catch (error) {
      console.log("Bag :: Fetch Bag Dishes :: Error: ", error);
    }
  };

  useEffect(() => {
    fetchBagDishes();
  }, [bagData]);

  useEffect(() => {
    let total = 0;
    if (bagData && bagDishes.length > 0) {
      bagDishes?.forEach((dish, index) => {
        const dishAmount = dish.amount;
        const dishQuantity = bagData?.dishes[index]?.quantity;

        total += dishAmount * dishQuantity;
      });
    }

    setOrderAmount(total);
  }, [bagData, bagDishes]);

  const mergedDishesArray = bagData?.dishes
    ?.map((bag) => {
      const dish = bagDishes.find((d) => d._id === bag.dishId);
      return dish ? { ...dish, quantity: bag.quantity } : null;
    })
    .filter((item) => item !== null);

  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PdbnkKP6uFdoyUhbCPEjNZtRb4SDakQ5ef9t3i5fUTSCciKjdrcO5X00uNdD9NlSJw1FGUPzZroaUKgEnBz8Uvh00rbSdqNwf"
    );
    try {
      console.log(mergedDishesArray, "mergedArray");
      const response = await axios.post(
        `${configVariables.ipAddress}/bags/create-checkout`,
        { mergedDishesArray },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id, // Access session ID from response.data
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.log("Bag :: Handle Payment :: Error:", error);
    }
  };

  const handleClearBag = async () => {
    try {
      const response = await axios.delete(
        `${configVariables.ipAddress}/bags/clearBag/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(loadBagData());
      }
    } catch (error) {
      console.log("Bag :: Handle clear bag :: Error: ", error);
    }
  };

  return (
    <div className="px-2 pb-8 mb-12 sm:mb-0 ">
      {bagData && (
        <div className="flex justify-between items-center bg-white dark:bg-slate-800 w-[90%] md:w-4/5 m-auto">
          <h1 className="font-bold text-lg underline">Your Bag</h1>
          <button
            onClick={handleClearBag}
            className="text-red-500 text-sm sm:text-md text-end self-end font-bold underline mb-1"
          >
            Clear Bag
          </button>
        </div>
      )}
      <ul className="bg-white dark:bg-slate-800 w-[90%] md:w-4/5 m-auto divide-y divide-slate-400">
        {bagData ? (
          bagDishes.map((eachDish, index) => (
            <DishItem
              key={eachDish._id}
              dish={eachDish}
              restaurantId={restaurantId}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <img src={EmptyBag} className="h-60 w-50" alt="payment Success" />
            <h1 className="mt-5 font-bold text-3xl text-cyan-400">
              Your Bag is Empty!
            </h1>
            <p className="mt-2 ">
              You can go to home page to view more restaurants
            </p>
            <button
              onClick={() => navigate("/")}
              className="border border-slate-500 px-3 py-2 mt-2 rounded-lg"
            >
              Home
            </button>
          </div>
        )}
      </ul>
      {bagData &&
        (userData.address ? (
          <div className="flex items-center justify-between w-[90%] md:w-4/5 m-auto border border-dashed border-slate-500 shadow-lg rounded-xl p-2 mb-2">
            <p>
              <span className="font-bold">Deliver to: </span>
              {userData.address}
            </p>
            <Link to="/my-profile">
              <button className="text-red-500 text-sm sm:text-md text-end self-end font-bold underline">
                Change address
              </button>
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <Link to="/my-profile">
              <button className="border border-slate-500 shadow-lg rounded-xl p-2 text-red-500 font-bold">
                Add address
              </button>
              <p className="text-red-500 mb-2">*Address is mandatory</p>
            </Link>
          </div>
        ))}
      {bagData && (
        <div className="w-[90%] md:w-4/5 m-auto border border-slate-500 shadow-lg rounded-xl p-2">
          <h3 className="text-md">Payment Summary</h3>
          <hr className="w-full my-2" />
          <ul>
            {bagDishes.map((eachDish, index) => (
              <li
                key={eachDish._id}
                className="flex w-full justify-between my-1"
              >
                <p className="truncate w-1/2 ">{eachDish.dishName}</p>
                <p className="w-1/4 text-center">
                  {bagData?.dishes[index]?.quantity}
                </p>
                <p className="w-1/4 ml-4">{`Rs ${
                  bagData?.dishes[index]?.quantity * eachDish.amount
                }/-`}</p>
              </li>
            ))}
          </ul>
          <hr className="w-full my-2" />
          <div className="flex w-full justify-between my-1">
            <p className=" w-1/2 "></p>
            <p className="w-1/4 text-center">Total: </p>
            <p className="w-1/4 ml-4">{`Rs ${orderAmount}/-`}</p>
          </div>
          <div className="w-full flex justify-end">
            <button
              disabled={!userData.address}
              className="px-3 py-2 border border-slate-500 rounded-xl"
              onClick={handlePayment}
            >
              Pay now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bag;
