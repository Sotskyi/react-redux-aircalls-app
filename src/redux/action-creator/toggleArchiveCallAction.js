import { toggleArchiveCallTypes } from "../types";

export const toggleArchiveCallAction = (call) => async (dispatch) => {
  try {
    dispatch({ type: toggleArchiveCallTypes.TOGGLE_ARCHIVE_CALL });
    const response = await fetch(
      `https://aircall-job.herokuapp.com/activities/${call.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_archived: !call.is_archived,
        }),
      }
    );
    await response.json();
    dispatch({
      type: toggleArchiveCallTypes.TOGGLE_ARCHIVE_CALL_SUCCESS,
      payload: call.id,
    });
  } catch (e) {
    dispatch({
      type: toggleArchiveCallTypes.TOGGLE_ARCHIVE_CALL_ERROR,
      payload: "Error occurred during loading data",
    });
  }
};
