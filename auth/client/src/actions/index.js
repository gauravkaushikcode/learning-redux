import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

// formProps = { email, password }
export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: "Email is in Use" });
  }
};
