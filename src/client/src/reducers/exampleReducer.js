import { GET_EXAMPLES, EXAMPLES_LOADING } from "../actions/actionTypes";

const initialState = {
  examples: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXAMPLES:
      return {
        ...state,
        examples: action.payload,
        loading: false
      };
    case EXAMPLES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
