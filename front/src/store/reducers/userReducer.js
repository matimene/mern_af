import { LOGIN, LOGOUT, SIGNUP } from "../actions/userActions";

const reducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return null;
    case SIGNUP:
      return state;
    default:
      return state;
  }
};

export default reducer;
