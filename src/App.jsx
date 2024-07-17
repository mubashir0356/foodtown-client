import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import Cookies from "js-cookie";
import axios from "axios";
import configVariables from "./configurations/config";
import PartnerHeader from "./components/Header/PartnerHeader";
import PartnerFooter from "./components/Footer/PartnerFooter";
import { loadRestaurantData } from "./store/restaurantSlice";
import { loadBagData } from "./store/bagSlice";

import "./App.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const userId = Cookies.get("userId");
  const jwtToken = Cookies.get("jwtToken");

  const pathsToHide = ["/login", "/register", "/partner-registration"];
  const hidingThePaths = pathsToHide.includes(location.pathname);

  const showPartnerHeaderFooter = location.pathname.startsWith("/partner");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `${configVariables.ipAddress}/users/getuser/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const userData = response.data.data;
          dispatch(login(userData));

          if (userData.isOwner) {
            const restaurantResponse = await axios.get(
              `${configVariables.ipAddress}/restaurants/getRestaurantData/${userId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwtToken}`,
                },
                withCredentials: true,
              }
            );

            if (restaurantResponse.status === 200) {
              const restaurantData = restaurantResponse.data.data;
              dispatch(loadRestaurantData(restaurantData));
            }
          } else {
            dispatch(loadBagData());
          }
        }
      } catch (error) {
        console.log("Error while fetching userdata", error);
      }
    };
    if (userId) {
      getUserData();
    }
  }, [userId, jwtToken, dispatch]);

  return (
    <div className="pt-6 bg-white dark:bg-slate-800 dark:text-white flex flex-col min-h-screen">
      {!hidingThePaths && !showPartnerHeaderFooter && <Header />}
      {showPartnerHeaderFooter && jwtToken && <PartnerHeader />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {showPartnerHeaderFooter && jwtToken && <PartnerFooter />}
      {!hidingThePaths && !showPartnerHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
