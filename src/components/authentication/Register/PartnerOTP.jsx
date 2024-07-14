import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Transition } from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import OtpInput from "../../utilities/OtpInput";
import configVariables from "../../../configurations/config";

function PartnerOTP({ onBack, email, name, mobile, password }) {
  const [isInvalidOtp, setIsInvalidOtp] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [genOtp, setGenOtp] = useState("");
  const [isValidOtp, setIsValidOtp] = useState(false);

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const generateOTP = () => {
    const max = 9000;
    const min = 1000;

    const otp = Math.floor(Math.random() * max) + min;
    setGenOtp(otp);
    return otp;
  };

  const sendOtp = async () => {
    const emailOTP = generateOTP();
    try {
      const body = {
        emailOTP,
        email,
        username: name,
        otpFor: "email verification",
        password,
        mobile,
      };

      const sendEmailOtpResponse = await axios.post(
        `${configVariables.ipAddress}/users/emailotp`,
        body
      );
      if (sendEmailOtpResponse.status === 200) {
        toast.success("OTP sent to email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setShowOTP(true);
      }
    } catch (error) {
      console.log("error while sending otp through email", error);
    }
  };

  const handleOtpSubmit = (userEnteredOtp) => {
    if (parseInt(userEnteredOtp) !== genOtp) {
      setIsInvalidOtp(true);
      setIsValidOtp(false);
    } else {
      setIsInvalidOtp(false);
      setIsValidOtp(true);
    }
  };

  const localRestaurantData = JSON.parse(
    localStorage.getItem("restaurantData")
  );

  let restaurantName;
  let address;
  let cuisines;
  let fromTime;
  let toTime;
  let logoPublicId;
  let logoUrl;

  if (localRestaurantData) {
    restaurantName = localRestaurantData.restaurantName;
    address = localRestaurantData.restaurantAddress;
    cuisines = localRestaurantData.selectedFoodTypes;
    fromTime = localRestaurantData.fromTime;
    toTime = localRestaurantData.toTime;
    logoPublicId = localRestaurantData.restaurantImgPublicID;
    logoUrl = localRestaurantData.restaurantImgUrl;
  }

  const verifyOTP = async (e) => {
    e.preventDefault();

    try {
      const body = {
        email,
        name,
        mobile,
        password,
        restaurantName,
        cuisines,
        address,
        fromTime,
        toTime,
        logoUrl,
        logoPublicId,
      };

      const response = await axios.post(
        `${configVariables.ipAddress}/restaurants/registerRestaurant`,
        body
      );

      if (response.status === 200) {
        localStorage.removeItem("restaurantData");
        setOpen(true);

        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (error) {
      console.log("Creating user and restaurant :: Error ", error);
    }
  };

  const handelModalClose = () => {
    localStorage.removeItem("restaurantData");
    navigate("/login");
  };

  return (
    <div className="mt-16">
      <h1 className="text-black text-lg font-bold mx-3 my-2 underline text-center">
        Verify your OTP
      </h1>
      <form onSubmit={verifyOTP} className="text-center">
        <p className="text-sm ">
          {" "}
          OTP will be sent to <b>{email}</b>
        </p>

        {!showOTP && (
          <div className="flex py-4 items-center">
            <div className="w-1/2">
              <button
                type="button"
                onClick={() => onBack("otp")}
                className="w-1/2 border rounded-full border-slate-500 py-2 px-3 text-black"
              >
                Back
              </button>
            </div>
            <div className="px-2 py-3 w-1/2 m-auto">
              <button
                type="button"
                className="border rounded-full border-slate-500 py-2 px-3 text-black disabled:cursor-not-allowed"
                onClick={sendOtp}
                // disabled={showOTPInput}
              >
                Verify Email
              </button>
            </div>
          </div>
        )}

        {showOTP && (
          <div className="mt-4">
            <OtpInput length={4} onOtpSubmit={handleOtpSubmit} />
          </div>
        )}

        {isInvalidOtp && (
          <p className="text-red-500 text-xs mt-2">Invalid OTP</p>
        )}
        {showOTP && (
          <div className="flex py-4 items-center">
            <div className="w-1/2">
              <button
                type="button"
                onClick={() => onBack("otp")}
                className="w-1/2 border rounded-full border-slate-500 py-2 px-3 text-black"
              >
                Back
              </button>
            </div>

            <div className="px-2 w-1/2 m-auto">
              <button
                type="submit"
                className="border rounded-full border-slate-500 py-2 px-3 text-black disabled:cursor-not-allowed"
                disabled={!isValidOtp}
              >
                Verify/Register
              </button>
            </div>
          </div>
        )}

        {/* <Button
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          Open modal
        </Button> */}
        <Transition in={open} timeout={400}>
          {(state) => (
            <Modal
              keepMounted
              open={!["exited", "exiting"].includes(state)}
              onClose={() => setOpen(false)}
              slotProps={{
                backdrop: {
                  sx: {
                    opacity: 0,
                    backdropFilter: "none",
                    transition: `opacity 400ms, backdrop-filter 400ms`,
                    ...{
                      entering: { opacity: 1, backdropFilter: "blur(8px)" },
                      entered: { opacity: 1, backdropFilter: "blur(8px)" },
                    }[state],
                  },
                },
              }}
              sx={{
                visibility: state === "exited" ? "hidden" : "visible",
              }}
            >
              <ModalDialog
                sx={{
                  height: "400px", // Specify the height
                  width: "600px", // Specify the width
                  backgroundImage:
                    "url('https://img.freepik.com/free-photo/clipboard-mexican-sauces_23-2147740781.jpg?t=st=1720615990~exp=1720619590~hmac=e25cdd136c290f90cab3b410203d83f5dd31b2a6e9fec09f161c01d73aa0ee07&w=900')",
                  backgroundSize: "cover", // Make the background cover the entire area
                  paddingTop: ["50%", "12%"],
                  opacity: 0,
                  transition: `opacity 300ms`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  ...{
                    entering: { opacity: 1 },
                    entered: { opacity: 1 },
                  }[state],
                }}
              >
                <DialogTitle>
                  <span className="text-black font-bold text-3xl">
                    Congratulations
                  </span>
                </DialogTitle>
                <DialogContent>
                  <span className="underline font-bold">
                    Your restaurant is successfully registered with us.
                  </span>
                </DialogContent>
                <button
                  className="border rounded-2xl px-5 py-3 shadow-2xl text-black font-bold"
                  onClick={handelModalClose}
                >
                  Ok
                </button>
              </ModalDialog>
            </Modal>
          )}
        </Transition>
      </form>
    </div>
  );
}

export default PartnerOTP;
