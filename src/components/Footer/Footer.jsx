import React from "react";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";

function Footer() {
  return (
    <div className="fixed bottom-0 bg-white z-5 w-full block sm:hidden border-t border-slate-500">
      <ul className="flex items-center justify-center space-x-6">
        <li className="flex flex-col items-center">
          <span>
            <HouseOutlinedIcon fontSize="small" />
          </span>
          <span>Home</span>
        </li>
        <li className="flex flex-col items-center">
          <span>
            <FoodBankOutlinedIcon fontSize="small" />
          </span>
          <span>Bag</span>
        </li>
        <li className="flex flex-col items-center">
          <span>
            <FavoriteBorderOutlinedIcon fontSize="small" />
          </span>
          <span>Wishlist</span>
        </li>
        <li className="flex flex-col items-center">
          <span>
            <ContactMailOutlinedIcon fontSize="small" />
          </span>
          <span>Contact Us</span>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
