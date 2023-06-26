import React from "react";
import { motion } from "framer-motion";
import emptyCartIllustration from "../assets/empty-cart.svg";

const EmptyCart = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full ml-32 mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={emptyCartIllustration}
        alt="Empty Cart Illustration"
        className="w-64 h-64 mb-8"
      />
      <h1 className="text-2xl text-primary font-semibold mb-4">
        Your cart is empty
      </h1>
      <p className="text-gray-500">Start adding items to your cart</p>
    </motion.div>
  );
};

export default EmptyCart;