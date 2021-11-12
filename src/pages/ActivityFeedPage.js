import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

import { CallRow } from "../components/CallRow";
import { CallsHeader } from "../components/CallsHeader";
import { ArchiveRow } from "../components/ArchiveRow";
import { Loader } from "../components/Loader";
import { fetchCalls } from "../redux/action-creator/fetchCallsActionAction";
import { addAllToArchiveAction } from "../redux/action-creator/addAllToArchiveAction";
import { getDate } from "../utils/getDate";
import { DETAILS_ROUTE } from "../utils/consts";

const useStyles = makeStyles({
  callsDate: {
    marginLeft: "75px",
    color: "grey",
    display: "flex",
    alignItems: "center",
    height: "30px",
  },
});
export const ActivityFeedPage = () => {
  const loading = useSelector((state) => state.calls.loading);

  const callsData = useSelector((state) => state.calls.data);
  const notArhivedCalls = useSelector(
    (state) => state.calls.data.filter((el) => el.is_archived === false),
    shallowEqual
  );
  const error = useSelector((state) => state.calls.error);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isShowVoiceMails, setIsShowVoiceMails] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCalls());
  }, [dispatch]);

  useEffect(() => {
    setData(notArhivedCalls);
  }, [notArhivedCalls]);

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {loading ? (
        <Loader />
      ) : (
        <div className={classes.activityContainer}>
          <CallsHeader
            isShowVoiceMails={isShowVoiceMails}
            setIsShowVoiceMails={setIsShowVoiceMails}
            title="NOT ARCHIVED CALLS"
          />
          <div onClick={() => dispatch(addAllToArchiveAction(callsData))}>
            <ArchiveRow title="Archive all calls" />
          </div>
          {notArhivedCalls.length === 0 && (
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              All calls is archived
            </div>
          )}
          <div style={{ overflowY: data.length > 6 ? "scroll" : "none" }}>
            {data
              .filter((el) => {
                if (isShowVoiceMails) {
                  return el.call_type === "voicemail";
                } else return el.is_archived === false;
              })
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    history.push(DETAILS_ROUTE + `${item.id}`, item)
                  }
                >
                  <div className={classes.callsDate}>
                    {getDate(item.created_at)}
                  </div>
                  {<CallRow item={item} isShowVoiceMails={isShowVoiceMails} />}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
