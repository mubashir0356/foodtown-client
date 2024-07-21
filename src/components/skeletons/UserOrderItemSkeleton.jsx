import React from "react";

function UserOrderItemSkeleton() {
  return (
    <div className="w-[90%] md:w-3/4 m-auto mt-4 border border-slate-500 shadow-md p-3 rounded-lg animate-pulse">
      <div className="flex justify-between items-center">
        <div className="w-4/5 flex gap-3">
          <div className="h-14 w-14 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-4 flex-grow pt-1">
            <div className="w-[40%] bg-gray-300 p-2 rounded-md"></div>
            <div className="w-2/3 bg-gray-300 p-2 rounded-md"></div>
          </div>
        </div>
        <div className="w-[15%] m-1 bg-gray-300 p-2 self-start rounded-md"></div>
      </div>
      <hr className="w-full my-2" />
      <div className="w-[90%] m-auto my-4 bg-gray-300 p-2 self-start rounded-md"></div>
      <div className="w-[90%] m-auto my-4 bg-gray-300 p-2 self-start rounded-md"></div>
      <hr className="w-full my-2" />
      <div className="m-auto mt-3 flex justify-between">
        <div className="w-3/5  bg-gray-300 p-2 rounded-md"></div>
        <div className="w-[15%] bg-gray-300 p-2 rounded-md"></div>
      </div>
    </div>
  );
}

export default UserOrderItemSkeleton;
