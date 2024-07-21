import React from "react";

function MenuItemSkeleton() {
  return (
    <div className="flex shadow-lg w-full md:w-[calc(50%-1rem)] border border-slate-500 rounded-md p-3 gap-4 animate-pulse">
      <div className="relative flex justify-center items-center rounded-lg bg-gray-300 h-24 sm:h-28 md:h-32 w-[30%]">
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
      <div className="w-[50%] space-y-3 mt-2 sm:mt-5">
        <div className="p-3 rounded-lg bg-gray-300 w-[80%]"></div>
        <div className="p-2 rounded-lg bg-gray-300 w-[50%]"></div>
        <div className="p-2 rounded-full bg-gray-300 w-full"></div>
      </div>
      <div className="mt-2 sm:mt-5 flex flex-grow gap-2 items-end justify-end">
        <div className="rounded-md bg-gray-300 h-4 w-4 sm:h-6 sm:w-6"></div>
        <div className="rounded-md bg-gray-300 h-4 w-4 sm:h-6 sm:w-6"></div>
      </div>
    </div>
  );
}

export default MenuItemSkeleton;
