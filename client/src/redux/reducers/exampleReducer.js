import {
  EXAMPLES_LOADED,
  EXAMPLES_LOADING,
  ADD_EXAMPLE,
  DELETE_EXAMPLE,
  CLEAR_EXAMPLES
} from "../types/exampleTypes";

const initialState = {
  examples: [],
  examplesLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EXAMPLES_LOADING:
      return {
        ...state,
        examplesLoading: true
      };
    case EXAMPLES_LOADED:
      return {
        ...state,
        examples: action.payload,
        examplesLoading: false
      };
    case ADD_EXAMPLE:
      return {
        ...state,
        examples: [action.payload, ...state.examples]
      };
    case DELETE_EXAMPLE:
      return {
        ...state,
        examples: state.examples.filter(ex => ex._id !== action.payload)
      };
    case CLEAR_EXAMPLES:
      return {
        examples: [],
        examplesLoading: false
      };
    default:
      return state;
  }
}
