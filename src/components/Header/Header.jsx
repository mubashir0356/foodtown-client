import React from "react";
import navImage from "../../../public/assets/navLogo.png";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import ThemeToggleButton from "./ThemeToggleButton";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwtToken");

  const dispatch = useDispatch();

  const uiTheme = useSelector((state) => state.uiTheme.theme);

  const iconColor = uiTheme === "dark" ? "white" : "black";

  const handleLogout = async () => {
    try {
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
        toast.success("Logout Successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        Cookies.remove("jwtToken");
        Cookies.remove("userId");
        dispatch(logout());

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log("User logout :: Error: ", error);
    }
  };

  const bagData = useSelector((state) => state.bag.bagData);

  return (
    <div className="min-w-screen sticky top-0 z-30 mb-4 bg-white dark:bg-slate-800">
      <ToastContainer />
      <nav className="flex items-center justify-between md:w-4/5 m-auto border border-slate-500 rounded-2xl text-sans w-11/12 bg-white dark:bg-slate-800 ">
        <NavLink to="/">
          <img src={navImage} alt="" className="h-12 w-40 -ml-3" />
        </NavLink>
        <ul className="items-center space-x-6 hidden sm:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-cyan-400 border-b-2 border-b-cyan-400" : ""}`
            }
          >
            <li className="flex items-center space-x-1">
              <span className="mb-1">
                <HouseOutlinedIcon fontSize="small" />
              </span>
              <span className="sm:hidden lg:inline">Home</span>
            </li>
          </NavLink>
          <NavLink
            to="/bag"
            className={({ isActive }) =>
              `${isActive ? "text-cyan-400 border-b-2 border-b-cyan-400" : ""}`
            }
          >
            <li className="flex items-center space-x-1">
              <span className="mb-1">
                <LocalMallOutlinedIcon fontSize="small" />
              </span>
              <span className="sm:hidden lg:inline">Bag</span>
              {bagData?.length > 0 && (
                <p className="bg-cyan-300 rounded-full w-6 h-6 ml-1 text-center">
                  {bagData?.length}
                </p>
              )}
            </li>
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `${isActive ? "text-cyan-400 border-b-2 border-b-cyan-400" : ""}`
            }
          >
            <li className="flex items-center space-x-1">
              <span className="mb-1">
                <FavoriteBorderOutlinedIcon fontSize="small" />
              </span>
              <span className="sm:hidden lg:inline">Wishlist</span>
            </li>
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `${isActive ? "text-cyan-400 border-b-2 border-b-cyan-400" : ""}`
            }
          >
            <li className="flex items-center space-x-1">
              <span className="mb-1">
                <ContactMailOutlinedIcon fontSize="small" />
              </span>
              <span className="sm:hidden lg:inline">Contact Us</span>
            </li>
          </NavLink>
        </ul>
        <div className="flex items-center justify-around md:w-2/6 lg:w-1/4 space-x-4">
          <ThemeToggleButton />
          <Dropdown>
            <MenuButton
              sx={{ minWidth: 60, padding: "2px", color: iconColor }}
              style={{ marginRight: "10px" }}
              endDecorator={
                <ArrowDropDown
                  style={{ marginLeft: "-5px", color: iconColor }}
                />
              }
            >
              <AccountCircleOutlinedIcon
                fontSize="small"
                sx={{ color: iconColor }}
              />
            </MenuButton>
            <Menu
              placement="bottom-end"
              sx={{
                minWidth: 120,
                "--ListItemDecorator-size": "24px",
                backgroundColor: `${uiTheme === "dark" ? "#1e293b" : "white"}`,
              }}
            >
              <MenuItem
                sx={{ color: `${uiTheme === "dark" ? "white" : "black"}` }}
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
              <MenuItem
                sx={{ color: `${uiTheme === "dark" ? "white" : "black"}` }}
              >
                Edit
              </MenuItem>
              <MenuItem
                sx={{ color: `${uiTheme === "dark" ? "white" : "black"}` }}
              >
                Help
              </MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </nav>
    </div>
  );
}

export default Header;
