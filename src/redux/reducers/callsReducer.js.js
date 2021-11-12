import {
  callsActionTypes,
  toggleArchiveCallTypes,
  addAllToArchiveTypes,
  resetArchiveTypes,
} from "../types";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const callsReducer = (state = initialState, action) => {
  switch (action.type) {
    case callsActionTypes.FETCH_CALLS:
      return { ...state, loading: true };
    case callsActionTypes.FETCH_CALLS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case callsActionTypes.FETCH_CALLS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case toggleArchiveCallTypes.TOGGLE_ARCHIVE_CALL:
      return { ...state, loading: true };
    case toggleArchiveCallTypes.TOGGLE_ARCHIVE_CALL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((el) => {
          if (el.id === action.payload) {
            el.is_archived = !el.is_archived;
          }
          return el;
        }),
      };
    case toggleArchiveCallTypes.TOGGLE_ARCHIVE_CALL_ERROR:
      return { ...state, loading: false, error: action.payload };

    case addAllToArchiveTypes.ADD_ALL_TO_ARCHIVE:
      return { ...state, loading: true };
    case addAllToArchiveTypes.ADD_ALL_TO_ARCHIVE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case addAllToArchiveTypes.ADD_ALL_TO_ARCHIVE_ERROR:
      return { ...state, loading: false, error: action.payload };

    case resetArchiveTypes.RESET_ARCHIVE:
      return { ...state, loading: true };
    case resetArchiveTypes.RESET_ARCHIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((el) => {
          el.is_archived = false;
          return el;
        }),
      };
    case resetArchiveTypes.RESET_ARCHIVE_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
