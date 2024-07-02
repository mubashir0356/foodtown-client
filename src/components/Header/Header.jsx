import React from "react";
import navImage from "../../../public/assets/navLogo.png";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";

function Header() {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwtToken");

  const handleLogout = async () => {
    try {
      console.log("Logout triggered");
      const response = await axios.post(
        `${configVariables.ipAddress}/users/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Cookies.remove("jwtToken");
        navigate("/login");
      }

      console.log(response, "logout response");
    } catch (error) {
      console.log("User logout :: Error: ", error);
    }
  };

  return (
    <div className="min-w-screen mt-4 sticky top-0 bg-white z-20 mb-4">
      <nav className="flex items-center justify-between md:w-3/4 m-auto border border-slate-500 rounded-2xl text-sans w-11/12 bg-white">
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
        {/* <p className="flex items-center space-x-1 mr-4">
          <span className="mb-1">
            <AccountCircleOutlinedIcon fontSize="small" />
          </span>
          <span>Account</span>
        </p> */}
        <Dropdown>
          <MenuButton
            sx={{ minWidth: 60, padding: "2px" }}
            style={{ marginRight: "10px" }}
            endDecorator={<ArrowDropDown style={{ marginLeft: "-5px" }} />}
          >
            <AccountCircleOutlinedIcon fontSize="small" />
          </MenuButton>
          <Menu
            placement="bottom-end"
            sx={{ minWidth: 120, "--ListItemDecorator-size": "24px" }}
          >
            <MenuItem
              // onClick={() => {
              //   const nextIndex = SIZES.indexOf(size) - 1;
              //   const value = nextIndex < 0 ? SIZES[SIZES.length - 1] : SIZES[nextIndex];
              //   setSize(value);
              // }}
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </MenuItem>
            <MenuItem
            // onClick={() => {
            //   const nextIndex = SIZES.indexOf(size) + 1;
            //   const value = nextIndex > SIZES.length - 1 ? SIZES[0] : SIZES[nextIndex];
            //   setSize(value);
            // }}
            >
              Edit
            </MenuItem>
            <MenuItem
            // onClick={() => {
            //   const nextIndex = SIZES.indexOf(size) + 1;
            //   const value = nextIndex > SIZES.length - 1 ? SIZES[0] : SIZES[nextIndex];
            //   setSize(value);
            // }}
            >
              Help
            </MenuItem>
          </Menu>
        </Dropdown>
      </nav>
    </div>
  );
}

export default Header;
