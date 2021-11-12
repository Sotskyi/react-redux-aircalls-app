import { resetArchiveTypes } from "../types";

export const resetArchiveAction = () => async (dispatch) => {
  try {
    dispatch({ type: resetArchiveTypes.RESET_ARCHIVE });
    await fetch("https://aircall-job.herokuapp.com/reset");

    dispatch({
      type: resetArchiveTypes.RESET_ARCHIVE_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: resetArchiveTypes.RESET_ARCHIVE_ERROR,
      payload: "Error occurred during loading data",
    });
  }
};
