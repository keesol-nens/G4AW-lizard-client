import * as ActionTypes from "../constants/ActionTypes";
import { initialSearchState } from "../store/Store";

export default function(state = initialSearchState, action) {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_INPUT_TEXT:
      return {
        ...state,
        inputText: action.inputText,
        latestSearchTerm: action.inputText,
        error: null
      };
    case ActionTypes.START_SEARCH:
      return {
        ...state,
        isFetching: true,
        results: null,
        error: null
      };
    case ActionTypes.RECEIVE_SEARCH_RESULTS_SUCCESS:
      // Additionally, in the parcels reducer a parcel is created for each result
      // that doesn't have one yet.
      return {
        ...state,
        isFetching: false,
        results: action.results.map(result => result.id),
        error: null
      };
    case ActionTypes.RECEIVE_SEARCH_RESULTS_ERROR:
      return {
        ...state,
        isFetching: false,
        results: null,
        error: action.error
      };
    case ActionTypes.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        isFetching: false,
        results: null,
        error: null,
        inputText: null
      };
    default:
      return state;
  }
}
