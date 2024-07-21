import axios from "axios";
import React, { useState, useId } from "react";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PartnerOrderItems({ order, fetchData }) {
  const jwtToken = Cookies.get("jwtToken");

  const timeFormatingOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const handleStatusChange = async (e) => {
    try {
      const response = await axios.put(
        `${configVariables.ipAddress}/orders/changeOrderStatus`,
        { selectedStatus: e.target.value, orderId: order._id },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Order Status Changed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchData();
      }
    } catch (error) {
      console.log("Partner Orders :: handleStatusChange :: Error:", error);
    }
  };

  return (
    <li className="border border-slate-300 rounded-lg shadow-xl w-[90%] md:w-3/4 m-auto mt-4">
      <ToastContainer />
      <div className=" rounded-t-lg flex justify-between w-full bg-slate-100 text-black dark:bg-slate-600 dark:text-white p-2 sm:p-4">
        <h1>{order.customerData.name}</h1>
        <p>
          {new Date(order.createdAt).toLocaleTimeString(
            "en-US",
            timeFormatingOptions
          )}
        </p>
      </div>
      <div>
        {order?.dishes?.length > 0 && (
          <ul className="w-full p-2 sm:p-4">
            {order.dishes.map((eachDish) => (
              <li
                key={useId()}
                className="flex w-full items-center justify-between"
              >
                <div className="flex w-4/5 items-center">
                  <p className="text-slate-400 font-bold">
                    {eachDish.quantity} x{" "}
                  </p>
                  <p className="ml-2 truncate text-sm sm:text-lg">
                    {eachDish.dishDetails.dishName}
                  </p>
                </div>
                <div className="w-1/5 md:w-[12%]">
                  <p className="text-xs sm:text-lg ">
                    Rs {eachDish.dishDetails.amount * eachDish.quantity}/-
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <hr className="w-full" />
      <div className="flex justify-between p-2 sm:p-4">
        {/* TODO: CHANGE STATUS TO DROPDOWN */}
        {/* <p className="w-4/5">{order.status}</p> */}
        <div className="flex justify-between">
          <select
            value={order.status}
            onChange={handleStatusChange}
            disabled={order.status === "Delivered"}
            className="disabled:cursor-not-allowed cursor-pointer border border-slate-200 rounded-md px-2 bg-slate-100 dark:bg-slate-600 text-black dark:text-white"
          >
            <option value="Waiting">Waiting</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <p className="font-bold w-1/5 md:w-[12%] text-xs sm:text-lg">
          Rs {order.orderAmount}/-
        </p>
      </div>
    </li>
  );
}

export default PartnerOrderItems;
