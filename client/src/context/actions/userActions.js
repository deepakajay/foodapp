//we will be calling this actions using dispatch function to the reducers and this reducers will change the data inside our store
export const setUserDetails = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export const getUserDetails = () => {
  return {
    type: "GET_USER",
  };
};

export const setUserNull = () => {
  return {
    type: "SET_USER_NULL",
    user: null,
  };
};
