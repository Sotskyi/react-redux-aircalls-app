import { combineReducers } from "redux";

import { callsReducer } from "./callsReducer.js.js";

export const rootReducer = combineReducers({
  calls: callsReducer,
});
