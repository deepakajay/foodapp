import React from "react";
import emptyDataIllustration from "../assets/empty-data.svg";

const NoOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={emptyDataIllustration}
        alt="No Data Illustration"
        className="w-77 h-44 mb-4"
      />
      <h1 className="text-2xl font-semibold text-gray-700">
        No orders available
      </h1>
      <p className="text-gray-500">Please order</p>
    </div>
  );
};

export default NoOrders;