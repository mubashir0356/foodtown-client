import React, { useEffect } from "react";
import FailureImg from "../../../public/assets/close-red-icon.png";
import { useNavigate } from "react-router-dom";

function PaymentFailure() {
  const navigate = useNavigate();
  const theme = localStorage.getItem("themeMode");

  useEffect(() => {
    setTimeout(() => {
      navigate("/bag");
    }, 3000);
  }, []);

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 px-2 pb-8 flex flex-col items-center justify-center ${
        theme === "light" ? "bg-white" : "bg-slate-800"
      }`}
    >
      <img src={FailureImg} className="h-60 w-50" alt="payment Success" />
      <h1 className="mt-5 font-bold text-3xl text-cyan-400">
        Oops! Something Went Wrong
      </h1>
      <p className={`mt-2 ${theme === "light" ? "text-black" : "text-white"}`}>
        Payment Failed
      </p>
      <p className="mt-2 w-80 sm:w-96 text-center text-slate-500">
        You will be redirected to the bag page shortly or click here to return
        to bag page
      </p>
      <button
        onClick={() => navigate("/bag")}
        className={`border border-slate-500 px-3 py-2 mt-2 rounded-lg ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Bag
      </button>
    </div>
  );
}

export default PaymentFailure;
