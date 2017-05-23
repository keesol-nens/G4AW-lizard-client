import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducers from "../reducers/index";

let createStoreWithMiddleware;
const logger = createLogger({});

createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(
  createStore
);

/**
 * Consumer applications may call createStore({}initialState, {}ownReducers) to
 * create a store with Lizard state and application specific state.
 */
const initialState = {
  rasters: {},
  search: {},
  timeseries: {}
};

function configureStore(initialState = {}, externalReducers = {}) {
  const rootReducer = combineReducers({ ...reducers, ...externalReducers });

  return createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export const theStore = configureStore(initialState);

/*
State = {
  rasters: {
    <Raster UUID 1>: {
      isFetching: <Boolean>,
      data: <RasterStoreObject 1>,  // "data" and "error" values are mutual
      error: <String[]>            // exclusive: max. one will be set.
    },
    <Raster UUID 2>: {
      isFetching: <Boolean>,
      data: <RasterStoreObject 2>,
      error: <String[]>
    },
  },
  search: {
      isFetching: <Boolean>,
      results: <SearchResult[]> if successfully requested, or null otherwise
  },
  timeseries: {
    <Parcel ID 1>: {
      isFetching: <Boolean>,
      data: <TimeseriesObject 1
      error: <String[]>
    },
    <Parcel ID 2>: {
      isFetching: <Boolean>,
      data: <TimeseriesObject 2>,
      error: <String[]>
    }
  }
}
*/
