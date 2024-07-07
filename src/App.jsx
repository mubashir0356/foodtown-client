import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import Cookies from "js-cookie";
import axios from "axios";
import configVariables from "./configurations/config";

import "./App.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const userId = Cookies.get("userId");
  const jwtToken = Cookies.get("jwtToken");

  const pathsToHide = ["/login", "/register"];
  const hidingThePaths = pathsToHide.includes(location.pathname);

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
        }
      } catch (error) {
        console.log("Error while fetching userdata", error);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="pt-6 bg-white dark:bg-slate-800 dark:text-white">
      {!hidingThePaths && <Header />}
      <Outlet />
      {!hidingThePaths && <Footer />}
    </div>
  );
}

export default App;
