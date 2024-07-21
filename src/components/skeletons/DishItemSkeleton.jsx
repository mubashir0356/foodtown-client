import React from "react";

function DishItemSkeleton() {
  return (
    <div className="w-[93%] sm:w-[80%] m-auto mb-4 border border-slate-500 shadow-md p-3 rounded-lg animate-pulse">
      <div className="flex justify-between">
        <div className="w-[80%] sm:w-[60%]">
          <div className="flex w-1/2 items-center">
            <div className="h-6 w-6 rounded-full bg-gray-300 mr-3"></div>
            <div className="w-[40%] rounded-sm h-3 bg-gray-300"></div>
          </div>
          <div className="w-3/4 h-5 bg-gray-300 rounded-md mt-2 sm:mt-3"></div>
          <div className="flex w-1/2 items-center mt-2 sm:mt-3">
            <div className="h-6 w-6 rounded-sm bg-gray-300 mr-3"></div>
            <div className="w-[40%] rounded-sm h-3 bg-gray-300"></div>
          </div>
          <div className="w-1/2 h-5 bg-gray-300 rounded-sm mt-2 sm:mt-3"></div>
        </div>
        <div className="relative h-28 sm:h-32 flex justify-center items-center rounded-lg bg-gray-300 w-[30%] sm:w-[25%]">
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
      </div>
      <div className="w-full rounded-sm bg-gray-300 h-5 m-auto mt-2 sm:hidden"></div>
    </div>
  );
}

export default DishItemSkeleton;
