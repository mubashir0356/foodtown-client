import React from "react";

function RestaurantCard(props) {
  const { restaurant } = props;

  return (
    <div className="h-64 w-56 mb-2 cursor-pointer">
      <div className="h-44 w-full overflow-hidden">
        <img
          className="h-full w-full object-cover border rounded-xl"
          src={restaurant.logo.url}
          alt="Restaurant Image"
        />
      </div>
      <div className="py-2">
        <h1 className="truncate text-lg font-semibold" onClick>
          {restaurant.name}
        </h1>
        <h6 className="text-sm dark:text-slate-300">
          30-45 <span className="text-xs">mins</span>
        </h6>
        <p className="text-sm line-clamp-2 dark:text-slate-300">
          {restaurant.cuisines.join(", ")}{" "}
        </p>
      </div>
    </div>
  );
}

export default RestaurantCard;
