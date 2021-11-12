import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

import { CallRow } from "../components/CallRow";
import { CallsHeader } from "../components/CallsHeader";
import { ArchiveRow } from "../components/ArchiveRow";
import { fetchCalls } from "../redux/action-creator/fetchCallsActionAction";
import { resetArchiveAction } from "../redux/action-creator/resetArchiveAction";
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
export const ArchivedListPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const [isShowVoiceMails, setIsShowVoiceMails] = useState(false);

  const onlyArchivedCalls = useSelector(
    (state) => state.calls.data.filter((el) => el.is_archived === true),
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchCalls());
  }, [dispatch]);

  return (
    <>
      <div className={classes.activityContainer}>
        <CallsHeader
          isShowVoiceMails={isShowVoiceMails}
          setIsShowVoiceMails={setIsShowVoiceMails}
          title={"Archived Calls"}
        />
        <div onClick={() => dispatch(resetArchiveAction())}>
          <ArchiveRow title="Reset all archive" />
        </div>
        {onlyArchivedCalls.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            No archived calls
          </div>
        )}
        <div
          style={{
            overflowY: onlyArchivedCalls.length > 6 ? "scroll" : "none",
          }}
        >
          {onlyArchivedCalls
            .filter((el) => {
              if (isShowVoiceMails) {
                return el.call_type === "voicemail";
              } else return el;
            })
            .map((item) => (
              <div
                key={item.id}
                onClick={() => history.push(DETAILS_ROUTE + `${item.id}`, item)}
              >
                <div className={classes.callsDate}>
                  {getDate(item.created_at)}
                </div>
                {<CallRow item={item} isShowVoiceMails={isShowVoiceMails} />}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
