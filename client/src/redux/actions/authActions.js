import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./actionTypes";

// Check token & load user
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  try {
    const res = await axios.get("/api/user/auth", tokenConfig(getState));
    dispatch({ type: USER_LOADED, payload: res.data.payload });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const registerUser = ({ name, email, password }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/user", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data.payload });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
    );
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login User
export const loginUser = ({ email, password }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/user/login", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.payload });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
    );
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout User
export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
};

// Setup config/headers & token
export const tokenConfig = getState => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
