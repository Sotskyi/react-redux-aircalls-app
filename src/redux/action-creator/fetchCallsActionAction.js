import { callsActionTypes } from "../types";

export const fetchCalls = () => async (dispatch) => {
  try {
    dispatch({ type: callsActionTypes.FETCH_CALLS });
    const response = await fetch(
      "https://aircall-job.herokuapp.com/activities"
    );
    const data = await response.json();
    dispatch({
      type: callsActionTypes.FETCH_CALLS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: callsActionTypes.FETCH_CALLS_ERROR,
      payload: "Error occurred during loading data",
    });
  }
};
