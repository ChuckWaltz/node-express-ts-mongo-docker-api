import axios from "axios";
import { returnErrors } from "./errorActions";

import { EXAMPLES_LOADING, GET_EXAMPLES } from "./actionTypes";

export const getExamples = () => async dispatch => {
  dispatch({ type: EXAMPLES_LOADING });

  try {
    const res = await axios.get("/api/example");
    setTimeout(() => {
      dispatch({ type: GET_EXAMPLES, payload: res.data.payload.examples });
    }, 1000);
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
