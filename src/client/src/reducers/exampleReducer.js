import { GET_EXAMPLES, EXAMPLES_LOADING } from "../actions/actionTypes";

const initialState = {
  examples: [],
  examplesLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXAMPLES:
      return {
        ...state,
        examples: action.payload,
        examplesLoading: false
      };
    case EXAMPLES_LOADING:
      return {
        ...state,
        examplesLoading: true
      };
    default:
      return state;
  }
}
