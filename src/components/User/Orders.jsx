import axios from "axios";
import React, { useEffect, useState } from "react";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import OrderItem from "./OrderItem";

function Orders() {
  const userId = Cookies.get("userId");
  const jwtToken = Cookies.get("jwtToken");

  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(
        `${configVariables.ipAddress}/orders/getUserOrders/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response, "User orders res");
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log("User Orders :: fetchUserOrders :: Error:", error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="px-0 sm:px-10 pb-8 mb-12 sm:mb-0 ">
      {orders.map((eachOrder) => (
        <OrderItem key={eachOrder._id} order={eachOrder} />
      ))}
    </div>
  );
}

export default Orders;
