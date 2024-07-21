import React from "react";

function PartnerOrderSkeleton() {
  return (
    <div className="border border-slate-500 rounded-lg shadow-xl w-[90%] md:w-3/4 m-auto mt-4 p-2 animate-pulse">
      <div className="flex justify-between">
        <div className="h-6 w-36 sm:w-56 rounded-full bg-gray-300"></div>
        <div className="h-6 w-20 sm:w-28 rounded-full bg-gray-300"></div>
      </div>
      <hr className="w-full my-2 " />
      <div className="h-2 w-[90%] m-auto mb-2 rounded-full bg-gray-300"></div>
      <div className="h-2 w-[90%] m-auto mb-2 rounded-full bg-gray-300"></div>
      <hr className="w-full my-2" />
      <div className="flex justify-between">
        <div className="h-6 w-28 sm:w-36 rounded-full bg-gray-300"></div>
        <div className="h-6 w-14 sm:w-20 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}

export default PartnerOrderSkeleton;
