import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

import {
  EXAMPLES_LOADING,
  EXAMPLES_LOADED,
  ADD_EXAMPLE,
  DELETE_EXAMPLE
} from "./actionTypes";

export const getExamples = () => async (dispatch, getState) => {
  dispatch({ type: EXAMPLES_LOADING });

  try {
    const res = await axios.get("/api/example", tokenConfig(getState));
    setTimeout(() => {
      dispatch({ type: EXAMPLES_LOADED, payload: res.data.payload.examples });
    }, 1000);
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const addExample = example => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "/api/example",
      example,
      tokenConfig(getState)
    );
    dispatch({ type: ADD_EXAMPLE, payload: res.data.payload });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "ADD_EXAMPLE_FAIL")
    );
  }
};

export const deleteExample = id => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/example/${id}`, tokenConfig(getState));
    dispatch({ type: DELETE_EXAMPLE, payload: id });
  } catch (err) {
    console.log(err);
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
