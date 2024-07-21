import navImage from "../../../public/assets/navLogo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import ThemeToggleButton from "./ThemeToggleButton";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function PartnerHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwtToken");
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
          autoClose: 3000,
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

  return (
    <div className="min-w-screen sticky top-0 z-20 mb-4 bg-white dark:bg-slate-800">
      <ToastContainer />
      <nav className="flex items-center justify-between md:w-4/5 m-auto border border-slate-500 rounded-2xl text-sans w-11/12 bg-white dark:bg-slate-800 ">
        <img src={navImage} alt="" className="h-12 w-40 -ml-3" />
        <ul className="items-center space-x-6 hidden sm:flex">
          <NavLink
            to="/partner-menu"
            className={({ isActive }) =>
              `${isActive ? "text-cyan-400 border-b-2 border-b-cyan-400 " : ""}`
            }
          >
            <li className="flex items-center space-x-1">
              <span className="mb-1">
                <FormatListBulletedOutlinedIcon fontSize="small" />
              </span>
              <span className="sm:hidden lg:inline">Menu</span>
            </li>
          </NavLink>
          <NavLink
            to="/partner-add-items"
            className={({ isActive }) =>
              `${isActive ? "text-cyan-400 border-b-2 border-b-cyan-400 " : ""}`
            }
          >
            <li className="flex items-center space-x-1">
              <span className="mb-1">
                <AddCircleOutlineOutlinedIcon fontSize="small" />
              </span>
              <span className="sm:hidden lg:inline">Add Dish</span>
            </li>
          </NavLink>
          <NavLink
            to="/partner-orders"
            className={({ isActive }) =>
              `${isActive ? "text-cyan-400 border-b-2 border-b-cyan-400 " : ""}`
            }
          >
            <li className="flex items-center space-x-1">
              <span className="mb-1">
                <ShoppingCartOutlinedIcon fontSize="small" />
              </span>
              <span className="sm:hidden lg:inline">Orders</span>
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
                  navigate("/partner-profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                sx={{ color: `${uiTheme === "dark" ? "white" : "black"}` }}
                onClick={() => {
                  handleLogout();
                }}
                className="bg-red-500"
              >
                Logout
              </MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </nav>
    </div>
  );
}

export default PartnerHeader;
