import React from "react";
import { makeStyles } from "@mui/styles";
import CallMadeSharpIcon from "@mui/icons-material/CallMadeSharp";
import CallReceivedSharpIcon from "@mui/icons-material/CallReceivedSharp";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import VoicemailIcon from "@mui/icons-material/Voicemail";

const useStyles = makeStyles({
  callRowcontainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e3dbdb",
    width: "320px",
    margin: "auto",
    height: "45px",
    borderRadius: "10px",
    backgroundColor: "#fdfdfd",
    color: "grey",
    cursor: "pointer",
  },
  phoneNumberContainer: { color: "grey", fontWeight: "bold" },
  iconsContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0 10px ",
  },
});

export const CallRow = ({ item, isShowVoiceMails }) => {
  const classes = useStyles();

  return (
    <div className={classes.callRowcontainer}>
      {isShowVoiceMails ? (
        <div style={{ margin: "0 10px " }}>
          <VoicemailIcon color="error" />
        </div>
      ) : (
        <div className={classes.iconsContainer}>
          {item.call_type === "missed" && (
            <CallMissedIcon fontSize="small" color="error" />
          )}
          {item.direction === "inbound" && item.call_type !== "missed" && (
            <CallMadeSharpIcon fontSize="small" color="error" />
          )}
          {item.direction === "outbound" && item.call_type !== "missed" && (
            <div style={{ color: "green" }}>
              <CallReceivedSharpIcon fontSize="small" />
            </div>
          )}

          <CallSharpIcon fontSize="small" />
        </div>
      )}
      <div className={classes.phoneNumberContainer}>
        {item.direction === "inbound" ? item.from : item.to}
      </div>
    </div>
  );
};
