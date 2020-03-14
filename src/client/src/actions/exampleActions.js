import { EXAMPLES_LOADING, GET_EXAMPLES } from "./actionTypes";

export const getExamples = () => dispatch => {
  dispatch({ type: EXAMPLES_LOADING });
  axios
    .get("/api/examples")
    .then(res => {
      dispatch({ type: GET_EXAMPLES, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
