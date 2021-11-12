import React from "react";
import { makeStyles } from "@mui/styles";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

const useStyles = makeStyles({
  archiveCalls: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e3dbdb",
    width: "320px",
    margin: "auto",
    height: "45px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    backgroundColor: "#fdfdfd",
    color: "grey",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

export const ArchiveRow = ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classes.archiveCalls}>
      {title === "Archive all calls" ? (
        <ArchiveOutlinedIcon sx={{ margin: "0 10px" }} />
      ) : (
        <RotateLeftIcon sx={{ margin: "0 10px" }} />
      )}
      {title}
    </div>
  );
};
