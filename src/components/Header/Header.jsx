import React from "react";
import navImage from "../../../public/assets/navLogo.png";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function Header() {
  return (
    <div className="min-w-screen mt-4 sticky top-0 bg-white z-20 mb-4">
      <navbar className="flex items-center justify-between md:w-3/4 m-auto border border-slate-500 rounded-2xl text-sans w-11/12 bg-white">
        <img src={navImage} alt="" className="h-12 w-40 -ml-3" />
        <ul className="flex items-center space-x-6 hidden sm:flex">
          <li className="flex items-center space-x-1">
            <span className="mb-1">
              <HouseOutlinedIcon fontSize="small" />
            </span>
            <span className="sm:hidden md:inline">Home</span>
          </li>
          <li className="flex items-center space-x-1">
            <span className="mb-1">
              <FoodBankOutlinedIcon fontSize="small" />
            </span>
            <span className="sm:hidden md:inline">Bag</span>
          </li>
          <li className="flex items-center space-x-1">
            <span className="mb-1">
              <FavoriteBorderOutlinedIcon fontSize="small" />
            </span>
            <span className="sm:hidden md:inline">Wishlist</span>
          </li>
          <li className="flex items-center space-x-1">
            <span className="mb-1">
              <ContactMailOutlinedIcon fontSize="small" />
            </span>
            <span className="sm:hidden md:inline">Contact Us</span>
          </li>
        </ul>
        <p className="flex items-center space-x-1 mr-4">
          <span className="mb-1">
            <AccountCircleOutlinedIcon fontSize="small" />
          </span>
          <span>Account</span>
        </p>
      </navbar>
    </div>
  );
}

export default Header;
