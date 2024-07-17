import React from "react";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function Footer() {
  const bagData = useSelector((state) => state.bag?.bagData);

  return (
    <div className="fixed bottom-0 bg-white z-5 w-full block sm:hidden border-t-2 border-slate-500 rounded-t-2xl dark:bg-slate-800 dark:text-white">
      <ul className="flex items-center justify-around space-x-6 py-2">
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? "text-cyan-400" : ""}`}
        >
          <li className="flex flex-col items-center">
            <span>
              <HouseOutlinedIcon fontSize="small" />
            </span>
            <span>Home</span>
          </li>
        </NavLink>
        <NavLink
          to="/bag"
          className={({ isActive }) => `${isActive ? "text-cyan-400" : ""}`}
        >
          <li className="flex flex-col items-center">
            {bagData?.dishes?.length > 0 ? (
              <p className="bg-cyan-300 rounded-full w-6 h-6 ml-1 text-center text-black text-base font-semibold">
                {bagData?.dishes?.length}
              </p>
            ) : (
              <span>
                <LocalMallOutlinedIcon fontSize="small" />
              </span>
            )}
            <span>Bag</span>
          </li>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => `${isActive ? "text-cyan-400" : ""}`}
        >
          <li className="flex flex-col items-center">
            <span>
              <ShoppingCartOutlinedIcon fontSize="small" />
            </span>
            <span>Orders</span>
          </li>
        </NavLink>
        <NavLink
          to="/contact-us"
          className={({ isActive }) => `${isActive ? "text-cyan-400" : ""}`}
        >
          <li className="flex flex-col items-center">
            <span>
              <ContactMailOutlinedIcon fontSize="small" />
            </span>
            <span>Contact Us</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Footer;
