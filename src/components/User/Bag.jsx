import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import configVariables from "../../configurations/config";
import DishItem from "../Restaurant/DishItem";
import { loadStripe } from "@stripe/stripe-js";

function Bag() {
  const [bagDishes, setBagDishes] = useState([]);
  const bagData = useSelector((state) => state.bag?.bagData);
  const bagDataDishIds = bagData?.dishes?.map((each) => each.dishId.toString());
  const [orderAmount, setOrderAmount] = useState(0);

  const restaurantId = bagData?.restaurantId;

  const jwtToken = Cookies.get("jwtToken");

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

      console.log(response);

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

  return (
    <div className="px-2 pb-8 mb-12 sm:mb-0 ">
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
          <h1>No dishes found in your bag...</h1>
        )}
      </ul>
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
