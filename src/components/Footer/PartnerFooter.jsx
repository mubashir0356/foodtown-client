import React from "react";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink } from "react-router-dom";

function PartnerFooter() {
  return (
    <div className="fixed bottom-0 bg-white z-5 w-full block sm:hidden border-t-2 border-slate-500 rounded-t-2xl dark:bg-slate-800 dark:text-white">
      <ul className="flex items-center justify-around space-x-6 py-2">
        <NavLink
          to="/partner-menu"
          className={({ isActive }) => `${isActive ? "text-cyan-500  " : ""}`}
        >
          <li className="flex flex-col items-center">
            <span>
              <FormatListBulletedOutlinedIcon fontSize="small" />
            </span>
            <span>Menu</span>
          </li>
        </NavLink>
        <NavLink
          to="/partner-add-items"
          className={({ isActive }) => `${isActive ? "text-cyan-500" : ""}`}
        >
          <li className="flex flex-col items-center">
            <span>
              <AddCircleOutlineOutlinedIcon fontSize="small" />
            </span>
            <span>Add Dish</span>
          </li>
        </NavLink>
        <NavLink
          to="/partner-orders"
          className={({ isActive }) => `${isActive ? "text-cyan-500" : ""}`}
        >
          <li className="flex flex-col items-center">
            <span>
              <ShoppingCartOutlinedIcon fontSize="small" />
            </span>
            <span>Orders</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}

export default PartnerFooter;
