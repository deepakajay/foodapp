import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-44 h-55">
      <img className="w-full" src={product.imageUrl} alt={product.product_name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.product_name}</div>
        <p className="text-gray-700 text-base">{product.product_category}</p>
        <p className="text-gray-700 text-base">₹{product.product_price}</p>
        <p className="text-gray-700 text-base">Quantity : {product.quantity}</p>
      </div>
    </div>
  );
};

export default ProductCard;