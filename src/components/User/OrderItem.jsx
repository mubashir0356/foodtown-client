import React from "react";
import { useNavigate } from "react-router-dom";

function OrderItem(props) {
  const { order } = props;
  const restaurantDetails = order.restaurantData;

  const navigate = useNavigate();

  const fromTime12Hour = (time) => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  const dateFormatingOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return (
    <div className="border border-slate-300 rounded-2xl shadow-xl w-[90%] md:w-3/4 m-auto mt-4 ">
      <div className="flex justify-between w-full bg-slate-100 text-black dark:bg-slate-600 dark:text-white rounded-t-2xl p-2 sm:p-4">
        <div className="h-16 w-16 sm:h-28 sm:w-28 mr-3">
          <img
            className="h-16 w-16 sm:h-full sm:w-full rounded-lg"
            src={restaurantDetails.logo.url}
            alt="Logo"
          />
        </div>

        <div className="flex-grow flex justify-between m-0">
          <div className="">
            <h3 className="font-bold text-md sm:text-xl">
              {restaurantDetails.name}
            </h3>
            <p className="text-xs sm:text-lg">{restaurantDetails.address}</p>
            <p className="text-xs sm:text-sm text-red-500">
              Opens at {fromTime12Hour(restaurantDetails.fromTime)}
            </p>
          </div>
          <div className="flex flex-col justify-between ml-">
            <p className="bg-slate-400 px-3 py-2 rounded-lg text-xs sm:text-md text-black text-center font-semibold">
              {order.status}
            </p>
            <button
              onClick={() => navigate(`/restaurants/${restaurantDetails._id}`)}
              className="text-red-500 text-sm sm:text-lg text-end self-end font-bold underline"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>
      <div>
        {order?.dishes?.length > 0 && (
          <ul className="w-full p-2 sm:p-4">
            {order.dishes.map((eachDish) => (
              <li key={eachDish.dishId} className="flex w-full ">
                <p className="text-slate-400 font-bold">
                  {eachDish.quantity} x{" "}
                </p>
                <p className="ml-2 truncate text-sm sm:text-lg">
                  {eachDish.dishDetails.dishName}
                </p>
              </li>
            ))}
          </ul>
        )}
        <hr className="w-full" />
        <div className="flex justify-between p-2 sm:p-4 text-xs sm:text-lg">
          <p>
            {new Date(order.createdAt).toLocaleString(
              "en-US",
              dateFormatingOptions
            )}
          </p>
          <b>Rs {order.orderAmount}/-</b>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
