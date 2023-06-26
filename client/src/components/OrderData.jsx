import { motion } from "framer-motion";
import React from "react";
import { HiCurrencyRupee } from "../assets/icons";
import { buttonClick, staggerFadeInOut } from "../animations";
import { getAllOrder, updateOrderStatus, updateOrderSts } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import { useDispatch } from "react-redux";
import ProductCard from "./ProductCard";

const OrderData = ({ index, data, admin }) => {
  const dispatch = useDispatch();

  const handleClick = (orderId, sts) => {
    updateOrderStatus(orderId, sts).then(() => {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    });
  };

  return (
    <motion.div
      {...staggerFadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-md gap-4 "
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-headingColor font-semibold">Orders</h1>

        <div className=" flex items-center gap-4">
          <p className="flex items-center gap-1 text-textColor">
            Total : <HiCurrencyRupee className="text-lg text-red-500" />{data.total}
            <span className="text-headingColor font-bold">{}</span>
          </p>

          <p className="px-2 py-[2px] text-sm text-headingColor font-semibold capitalize  rounded-md bg-emerald-400 drop-shadow-md">
           Cash on Delivery
          </p>

          <p
            className={`text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
              (data.status === "preparing" && "text-orange-500 bg-orange-100") ||
              (data.status === "cancelled" && "text-red-500 bg-red-100") ||
              (data.status === "delivered" && "text-emerald-500 bg-emerald-100")
            }`}
          >
            {data?.status}
          </p>

          {admin && (
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-semibold text-headingColor">Mark As</p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.id, "preparing")}
                className={`text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Preparing
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.id, "cancelled")}
                className={`text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Cancelled
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.id, "delivered")}
                className={`text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Delivered
              </motion.p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start justify-start flex-col gap-2 px-6 ml-auto w-full md:max-w-460">
  <h1 className="text-lg font-semibold text-headingColor">
    Name: {data.address.Name}
  </h1>
  <p className="text-base text-headingColor mt-1">
    House No: {data.address.HouseNo} 
  </p>
  <p className="text-base text-headingColor">
    Street: {data.address.Street} 
  </p>
  <p className="text-base text-headingColor">
    Phone: {data.address.PhoneNumber}
  </p>
</div>

      <div className="flex items-center justify-start flex-wrap w-full max-w-screen-lg mx-auto overflow-x-auto">
        <div className="flex items-center justify-center gap-4">
          {data?.items &&
            data.items.map((item, j) => (
                <ProductCard product={item}/>
            ))}
        </div>

       
      </div>
    </motion.div>
  );
};

export default OrderData;
