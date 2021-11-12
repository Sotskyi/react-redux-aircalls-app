import { addAllToArchiveTypes } from "../types";

export const addAllToArchiveAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: addAllToArchiveTypes.ADD_ALL_TO_ARCHIVE });

    const urls = data.map(
      (el) => `https://aircall-job.herokuapp.com/activities/${el.id}`
    );
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        is_archived: true,
      }),
    };
    const fetchJson = (url) => fetch(url, options).then((res) => res.json());

    Promise.all(urls.map(fetchJson)).then((data) => {
      dispatch({
        type: addAllToArchiveTypes.ADD_ALL_TO_ARCHIVE_SUCCESS,
        payload: data,
      });
    });
  } catch (e) {
    dispatch({
      type: addAllToArchiveTypes.ADD_ALL_TO_ARCHIVE_ERROR,
      payload: "Error occurred during loading data",
    });
  }
};
