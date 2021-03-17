import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

// action handler for signup form
// formProps = { email, password }
export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    // adding localStorage for persisting Login State
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Email is in Use" });
  }
};

// action handler for signout
export const signout = () => {
  localStorage.removeItem("token");

  return { type: AUTH_USER, payload: "" };
};

// action handler for signin form
// formProps = { email, password }
export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    // adding localStorage for persisting Login State
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid Creds" });
  }
};
