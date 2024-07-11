import React, { useRef, useState } from "react";
import restaurantDefaultImage from "../../../../public/assets/image1.jpeg";
import axios from "axios";
import configVariables from "../../../configurations/config";

function RestaurantDetails({ onBack, onNext }) {
  const localRestaurantData = JSON.parse(
    localStorage.getItem("restaurantData")
  );

  let localRestaurantName;
  let localSelectedFoodTypes;
  let localFromTime;
  let localToTime;
  let localRestaurantAddress;
  let localRestaurantImgPublicID;
  let localRestaurantImgUrl;

  if (localRestaurantData) {
    localRestaurantName = localRestaurantData.restaurantName;
    localRestaurantAddress = localRestaurantData.restaurantAddress;
    localSelectedFoodTypes = localRestaurantData.selectedFoodTypes;
    localFromTime = localRestaurantData.fromTime;
    localToTime = localRestaurantData.toTime;
    localRestaurantImgPublicID = localRestaurantData.restaurantImgPublicID;
    localRestaurantImgUrl = localRestaurantData.restaurantImgUrl;

    console.log(localSelectedFoodTypes, "slected types");
  }

  const imgRef = useRef();
  const [restaurantImgUrl, setRestaurantImgUrl] = useState(
    localRestaurantImgUrl || ""
  );
  const [restaurantImgPublicID, setRestaurantImgPublicId] = useState(
    localRestaurantImgPublicID || ""
  );
  const [selectedFoodTypes, setSelectedFoodTypes] = useState(
    localSelectedFoodTypes || []
  );
  const [restaurantName, setRestaurantName] = useState(
    localRestaurantName || ""
  );
  const [fromTime, setFromTime] = useState(localFromTime || "");
  const [toTime, setToTime] = useState(localToTime || "");
  const [restaurantAddress, setRestaurantAddress] = useState(
    localRestaurantAddress || ""
  );
  const [showNextButton, setShowNextButton] = useState(true);

  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const [restaurantFormError, setRestaurantFormError] = useState({
    restaurantNameError: false,
    fromTimeError: false,
    toTimeError: false,
    addressError: false,
    foodTypesError: false,
  });

  console.log(restaurantFormError);

  const checkFormErrors = () => {
    let errors = {};
    if (!restaurantName) errors.restaurantNameError = true;
    if (!fromTime) errors.fromTimeError = true;
    if (!toTime) errors.toTimeError = true;
    if (!restaurantAddress) errors.addressError = true;
    if (!selectedFoodTypes.length) errors.foodTypesError = true;

    setRestaurantFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRestaurantForm = async (e) => {
    e.preventDefault();
    setServerError(false);

    const isFormErrors = checkFormErrors();
    if (!isFormErrors) return;

    try {
      const response = await axios.get(
        `${configVariables.ipAddress}/restaurants/checkHotelExistence/${restaurantName}`
      );

      if (response.status === 200) {
        const restaurantData = {
          restaurantName,
          restaurantAddress,
          fromTime,
          toTime,
          selectedFoodTypes,
          restaurantImgPublicID,
          restaurantImgUrl,
        };
        localStorage.setItem("restaurantData", JSON.stringify(restaurantData));
        onNext("restaurant");
      }
    } catch (error) {
      console.log("Register :: Restaurant already exist :: Error", error);
      setServerError(true);
      setServerErrorMessage(error.response.data.message);
    }
  };

  const handleFoodTypes = (e) => {
    const selectedType = e.target.name;
    let updatedFoodTypes = selectedFoodTypes;

    if (selectedFoodTypes.includes(selectedType)) {
      updatedFoodTypes = updatedFoodTypes.filter(
        (type) => type !== selectedType
      );
    } else {
      updatedFoodTypes = [...updatedFoodTypes, selectedType];
    }

    setSelectedFoodTypes(updatedFoodTypes);
  };

  const handleImgClick = () => {
    setShowNextButton(false);
    const isFormErrors = checkFormErrors();
    if (!isFormErrors) return;

    imgRef.current.click();
  };

  const handleImgChange = async (event) => {
    setServerError(false);

    const imgFile = event.target.files[0];

    const formData = new FormData();
    formData.append("restaurantName", restaurantName);
    formData.append("restaurantImg", imgFile);

    try {
      const response = await axios.post(
        `${configVariables.ipAddress}/restaurants/uploadRestaurantImg`,
        formData
      );

      console.log(response, "upload img res");

      if (response.status === 200) {
        setRestaurantImgPublicId(response.data.data.public_id);
        setRestaurantImgUrl(response.data.data.url);
        setShowNextButton(true);
      }
    } catch (error) {
      console.log("Uploading restaurant image :: Error ", error);
      setServerError(true);
      setServerErrorMessage(error.response.data.message);
    }
  };

  const handleFromTime = (event) => {
    console.log(event.target, "from time");
    const timeValue = event.target.value;
    setFromTime(timeValue);
  };
  const handleToTime = (event) => {
    setToTime(event.target.value);
  };

  const foodTypes = [
    "Biryani",
    "Pizza",
    "Beverages",
    "Chineese",
    "Desserts",
    "Street food",
    "Others",
  ];

  return (
    <div className="mt-16">
      <h1 className="text-black text-lg font-bold mx-3 my-2 underline text-center">
        Restaurant Details
      </h1>
      <form
        className="text-sans space-y-3 md:space-y-0 flex flex-wrap"
        onSubmit={handleRestaurantForm}
      >
        <div className="w-full md:w-1/2 px-2 space-y-2">
          <div className="w-full">
            <label
              className="text-black text-md font-bold"
              htmlFor="restaurantName"
            >
              Restaurant name
            </label>
            <input
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="Restaurant name"
              value={restaurantName}
              type="text"
              id="restaurantName"
              className="p-2 w-full border rounded-xl border-slate-500 text-black text-sm focus:outline-none"
            />
          </div>
          {restaurantFormError.restaurantNameError && (
            <span className="text-red-600 text-xs md:text-sm">
              *Name is mandatory
            </span>
          )}
          <div className="flex justify-between">
            <div className="w-40">
              <label
                htmlFor="startTime"
                className="block mb-2 text-sm text-black font-bold"
              >
                Opening time:
              </label>
              <input
                onChange={(event) => handleFromTime(event)}
                type="time"
                id="startTime"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={fromTime}
              />
              {restaurantFormError.fromTimeError && (
                <span className="text-red-600 text-xs md:text-sm">
                  *Opening time is mandatory
                </span>
              )}
            </div>

            <div className="w-40">
              <label
                htmlFor="end-time"
                className="block mb-2 text-sm  text-black font-bold"
              >
                Closing time:
              </label>

              <input
                onChange={(event) => handleToTime(event)}
                type="time"
                id="end-time"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={toTime}
              />
              {restaurantFormError.toTimeError && (
                <span className="text-red-600 text-xs md:text-sm">
                  *Closing time is mandatory
                </span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="restaurantAdress"
              className="text-black text-md font-bold"
            >
              Address
            </label>
            <textarea
              onChange={(e) => setRestaurantAddress(e.target.value)}
              rows={5}
              value={restaurantAddress}
              name="restaurant-name"
              id="restaurantAdress"
              className="p-2 w-full border rounded-xl border-slate-500 text-black text-sm focus:outline-none"
            />
          </div>
          {restaurantFormError.addressError && (
            <span className="text-red-600 text-xs md:text-sm">
              *Address is mandatory
            </span>
          )}
          <div>
            <div
              className="relative z-0 w-full mb-5 mt-3 group"
              onClick={handleImgClick}
            >
              <input
                ref={imgRef}
                className="hidden"
                type="file"
                onChange={handleImgChange}
              />
              <button
                type="button"
                className="w-full border rounded-xl border-slate-500 p-3 text-black disabled:cursor-not-allowed"
              >
                Upload Restaurant Image/Logo
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <div className="relative z-0 w-full mb-5 mt-3 group flex justify-center">
            <img
              src={restaurantImgUrl ? restaurantImgUrl : restaurantDefaultImage}
              className="h-36 w-36 border rounded-2xl"
            />
          </div>
          <div className="relative z-0 w-full mb-2 mt-3 group border border-slate-500 rounded-xl p-2">
            <h1 className="text-black text-lg font-bold">Type of Cuisines</h1>
            <p className="text-xs mx-2">
              Select options which best describe food you serve
            </p>
            <div className="flex flex-wrap justify-between my-2">
              {foodTypes.map((item) => (
                <div key={item} className="flex items-center w-full md:w-1/2">
                  <input
                    type="checkbox"
                    name={item}
                    id={item}
                    checked={selectedFoodTypes.includes(item)}
                    value={item}
                    onChange={handleFoodTypes}
                  />
                  <label
                    htmlFor={item}
                    className="ml-2 accent-teal-500 cursor-pointer "
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
            {restaurantFormError.foodTypesError && (
              <span className="text-red-600 text-xs md:text-sm">
                *Food types is mandatory
              </span>
            )}
          </div>
        </div>
        {serverError && (
          <p className="w-full text-red-500 text-sm md:text-md pb-2 text-center">
            {serverErrorMessage}
          </p>
        )}
        <div className="flex justify-between w-full">
          <div className="w-1/2">
            <button
              type="button"
              onClick={() => onBack("restaurant")}
              className="w-1/2 border rounded-full border-slate-500 p-3 text-black"
            >
              Back
            </button>
          </div>
          {showNextButton && (
            <div className="w-1/2">
              <button
                className="w-1/2 border rounded-full border-slate-500 p-3 text-black"
                type="submit"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default RestaurantDetails;
