import React from "react";

function RestaurantCardSkeleton() {
  return (
    <div className="h-62 w-56 mb-2 border border-slate-500 shadow-md p-2 rounded-lg animate-pulse">
      <div className="relative h-40 mb-4 flex justify-center items-center rounded-lg bg-gray-300 ">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="h-4 bg-gray-300 rounded-sm mb-2 w-[80%]"></div>
      <div className="h-4 bg-gray-300 rounded-sm mb-2 w-[70%]"></div>
    </div>
  );
}

export default RestaurantCardSkeleton;
