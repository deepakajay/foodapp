export const setAllProducts = (products) => {
  return {
    type: "SET_ALL_PRODUCTS",
    product: products,
  };
};

export const getAllProducts = () => {
  return {
    type: "GET_ALL_PRODUCTS",
  };
};
