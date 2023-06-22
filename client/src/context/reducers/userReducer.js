//the actions are send to this reducer and this reducer will be interacting with the store
//this reducer function will have two parameters first one is the initial state and second one is the action
//according to the action type specified we will be interacting with the store
const userReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_USER":
      return state;

    case "SET_USER":
      return action.user;
    case "SET_USER_NULL":
      return null;
    default:
      return state;
  }
};

export default userReducer;
