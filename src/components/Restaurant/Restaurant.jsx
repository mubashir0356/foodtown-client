import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DishItem from "./DishItem";
import DishItemSkeleton from "../skeletons/DishItemSkeleton";

function Restaurant() {
  const { restaurantId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // TODO: add skeleton or loading effect

  const [restaurantDetails, setRestauranDetails] = useState({});
  const [dishes, setDishes] = useState([]);
  const [ownerDetails, setOwnerDetails] = useState({});

  const jwtToken = Cookies.get("jwtToken");

  const fetchRestaurantData = async () => {
    try {
      //  TODO: add pagination with infinite scrolling in below api
      const response = await axios.get(
        `${configVariables.ipAddress}/restaurants/restaurantDishes/${restaurantId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const responseData = response.data.data;
        const restaurantData = {
          name: responseData.name,
          mobile: responseData.mobile,
          address: responseData.address,
          cuisines: responseData.cuisines,
          fromTime: responseData.fromTime,
          toTime: responseData.toTime,
          logo: responseData.logo,
          createdAt: responseData.createdAt,
          updatedAt: responseData.updatedAt,
          _id: responseData._id,
        };
        setRestauranDetails(restaurantData);
        setDishes(responseData.dishesData);
        setOwnerDetails(responseData.ownerData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Restaurant :: Fetch Restaurant Data :: Error:", error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const renderRestaurantDetails = () => (
    <div className="bg-gradient-to-b from-cyan-50 via-cyan-200 to-blue-300 dark:from-slate-800 dark:via-cyan-200 dark:to-blue-300 w-[90%] md:w-4/5 m-auto rounded-b-2xl p-4 pt-0">
      <div className="bg-white dark:bg-slate-800 border border-slate-500 rounded-xl m-auto p-4">
        <div className="flex items-center gap-1 font-semibold">
          <StarsRoundedIcon fontSize="small" sx={{ color: "green" }} />
          <p>4.1 (1k+ ratings)</p>
        </div>
        <p className="py-1 text-slate-800 dark:text-slate-400">
          {restaurantDetails.cuisines?.join(" | ")}
        </p>
        <ul className="list-disc mx-4 marker:text-slate-400 marker:text-lg pb-2">
          <li>
            <b>Outlet</b>
            <span className="ml-2 text-slate-800 dark:text-slate-400">
              Hyderabad
            </span>
          </li>
          <li>
            <b>35 to 45 mins</b>
          </li>
        </ul>
        <hr className="w-full border-slate-300 dark:border-slate-500" />
        <div className="mt-2 flex items-center">
          <DirectionsBikeIcon fontSize="small" />
          <p className="ml-2 text-xs md:text-base">
            Order above Rs 149/- for discounted delivery charges
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-2 pb-8 mb-12 sm:mb-0 ">
      <h1 className="sticky top-12 z-20 mb-4 text-xl font-bold underline tracking-wide w-full text-center bg-white dark:bg-slate-800">
        {restaurantDetails.name}
      </h1>
      {renderRestaurantDetails()}
      <h2 className="my-4 text-xl font-bold tracking-wide bg-white dark:bg-slate-800 w-[90%] md:w-4/5 m-auto">
        Dishes
      </h2>
      <ul className="bg-white dark:bg-slate-800 w-[90%] md:w-4/5 m-auto divide-y divide-slate-400">
        {isLoading
          ? new Array(5)
              .fill("")
              .map((e, index) => <DishItemSkeleton key={index} />)
          : dishes.map((eachDish) => (
              <DishItem
                key={eachDish._id}
                dish={eachDish}
                restaurantId={restaurantDetails._id}
              />
            ))}
      </ul>
    </div>
  );
}

export default Restaurant;
