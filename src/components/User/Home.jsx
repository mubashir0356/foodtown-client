import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import RestaurantCard from "../Restaurant/RestaurantCard";

function Home() {
  const [page, setPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const jwtToken = Cookies.get("jwtToken");
  // TODO: Add no retaurant case too

  const getRestaurants = async () => {
    try {
      const response = await axios.get(
        `${configVariables.ipAddress}/restaurants/getAllRestaurants?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (page === 1) {
        setRestaurants(response.data.data);
      } else {
        setRestaurants((prevData) => [...prevData, ...response.data.data]);
      }
    } catch (error) {
      console.log("User Menu :: Get Restaurants :: Error", error);
    }
  };

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log("User Menu :: Handle Infinite Scroll :: Error", error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <div className="px-10 pb-8 mb-12 sm:mb-0 ">
      <ToastContainer />
      <h1 className="text-center mb-4 text-xl font-bold underline tracking-wide">
        Restaurants
      </h1>
      <div className="mx-auto w-[90%] md:w-4/5 flex justify-center md:justify-start flex-wrap gap-4">
        {restaurants.map((restaurant) => (
          <Link key={restaurant._id} to={`/restaurants/${restaurant._id}`}>
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
