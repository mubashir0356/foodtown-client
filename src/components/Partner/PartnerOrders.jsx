import axios from "axios";
import React, { useEffect, useState } from "react";
import configVariables from "../../configurations/config";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import PartnerOrderItems from "./PartnerOrderItems";
import PartnerOrderSkeleton from "../skeletons/PartnerOrderSkeleton";

function PartnerOrders() {
  const restaurantData = useSelector(
    (state) => state.restaurant?.restaurantData
  );
  const jwtToken = Cookies.get("jwtToken");

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRestaurantOrders = async () => {
    try {
      const response = await axios.get(
        `${configVariables.ipAddress}/orders/getPartnerOrders/${restaurantData?._id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setOrders(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Partner Orders :: fetchRestaurantOrders :: Error:", error);
    }
  };

  useEffect(() => {
    if (restaurantData) {
      fetchRestaurantOrders();
    }
  }, [restaurantData]);
  return (
    <div className="px-0 sm:px-10 pb-8 mb-12 sm:mb-0">
      <ul>
        {isLoading
          ? new Array(6)
              .fill("")
              .map((each, index) => <PartnerOrderSkeleton key={index} />)
          : orders.map((eachOrder) => (
              <PartnerOrderItems
                key={eachOrder._id}
                order={eachOrder}
                fetchData={fetchRestaurantOrders}
              />
            ))}
      </ul>
    </div>
  );
}

export default PartnerOrders;
