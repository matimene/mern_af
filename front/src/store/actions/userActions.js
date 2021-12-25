import { displayErrorMsg, displaySuccessMsg, emptyCache } from "../../utils";
import { login, signup } from "../../services";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";

export const setFromLocalStorage = (user) => {
  displaySuccessMsg(`Welcome back ${user.username}`, 1500);

  return {
    type: LOGIN,
    payload: user,
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const loggedUser = await login({ username, password });
      localStorage.setItem("mern-af_loggedUser", JSON.stringify(loggedUser));
      displaySuccessMsg(`Welcome back ${loggedUser.username}`, 1500);

      return dispatch({
        type: LOGIN,
        payload: loggedUser,
      });
    } catch (err) {
      displayErrorMsg(err);
    }
  };
};

export const signupUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const createdUser = await signup({ username, password });
      displaySuccessMsg(
        `Account created, log in now ${createdUser.username}!`,
        1500
      );

      return dispatch({
        type: SIGNUP,
      });
    } catch (err) {
      displayErrorMsg(err);
    }
  };
};

export const logout = () => {
  localStorage.removeItem("mern-af_loggedUser");
  emptyCache(); //Makes sure the window reloads and sucessfully logout the user
  return {
    type: LOGOUT,
  };
};
