import { GET_ERRORS, CLEAR_ERRORS } from "../types/errorTypes";

// RETURN ERRORS
export const returnErrors = (response, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: {
      response,
      status,
      id
    }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
