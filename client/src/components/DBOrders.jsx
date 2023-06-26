import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import { MainLoader, NoOrders, OrderData } from "../components";

const DBOrders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    }
    setIsLoading(true);
    setTimeout(()=>{setIsLoading(false)},2000)
  }, []);

  return (
    <div className=" flex items-center justify-center flex-col pt-6 w-full gap-4">
      {isLoading ? <MainLoader/> : (
      orders ? (
        <>
          {orders.map((item, i) => (
            <OrderData key={i} index={i} data={item} admin={true} />
          ))}
        </>
      ) : (
        <>
          <NoOrders/>
        </>
      ))}
    </div>
  );
};

export default DBOrders;
