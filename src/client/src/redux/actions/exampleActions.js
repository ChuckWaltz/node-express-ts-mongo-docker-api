import axios from "axios";
import { EXAMPLES_LOADING, GET_EXAMPLES } from "./actionTypes";

export const getExamples = () => dispatch => {
  dispatch({ type: EXAMPLES_LOADING });
  axios
    .get("/api/examples")
    .then(res => {
      console.log(res);
      setTimeout(() => {
        dispatch({ type: GET_EXAMPLES, payload: res.data.payload.examples });
      }, 1000);
    })
    .catch(err => {
      console.log(err);
    });
};
