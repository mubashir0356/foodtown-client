import React, { useEffect, useState, useRef } from "react";
import successImage from "../../../public/assets/safety-icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configVariables from "../../configurations/config";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { loadBagData } from "../../store/bagSlice";

function PaymentSuccess() {
  const [disableOrderButton, setDisableOrderButton] = useState(true);
  const bagData = useSelector((state) => state.bag?.bagData);
  const orderCreated = useRef(false); // Add this line
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = localStorage.getItem("themeMode");

  const jwtToken = Cookies.get("jwtToken");

  const createOrder = async () => {
    if (orderCreated.current) return; // Add this line

    orderCreated.current = true; // Add this line
    const body = {
      bagData,
    };

    try {
      const response = await axios.post(
        `${configVariables.ipAddress}/orders/createOrder/`,
        body,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(loadBagData());
        setDisableOrderButton(false);

        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      }
    } catch (error) {
      console.log("PaymentSuccess :: createOrder :: Error:", error);
    }
  };

  useEffect(() => {
    if (bagData) {
      createOrder();
    }
  }, [bagData]);

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 px-2 pb-8 flex flex-col items-center justify-center ${
        theme === "light" ? "bg-white" : "bg-slate-800"
      }`}
    >
      <img src={successImage} className="h-60 w-50" alt="payment Success" />
      <h1 className="mt-5 font-bold text-3xl text-cyan-400">Thank You!</h1>
      <p className={`mt-2 ${theme === "light" ? "text-black" : "text-white"}`}>
        Payment done Successfully
      </p>
      <p className="mt-2 w-80 sm:w-96 text-center text-slate-500">
        You will be redirected to the orders page shortly or click here to
        return to orders page
      </p>
      <button
        disabled={disableOrderButton}
        onClick={() => navigate("/orders")}
        className={`disabled:cursor-not-allowed border border-slate-500 px-3 py-2 mt-2 rounded-lg ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Orders
      </button>
    </div>
  );
}

export default PaymentSuccess;
