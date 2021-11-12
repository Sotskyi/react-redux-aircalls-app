import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import ArchiveIcon from "@mui/icons-material/Archive";

import { useHistory } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { ACTIVITY_FEED_ROUTE, ARCHIVED_LIST_ROUTE } from "../utils/consts";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  label: {
    width: "28px",
    height: "18px",
    background: "#9c27b0",
    borderRadius: "26px",
    color: "white",
  },
});

export default function CallsTab() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const history = useHistory();
  const onlyArchivedCalls = useSelector(
    (state) => state.calls.data.filter((el) => el.is_archived === true),
    shallowEqual
  );
  const notArhivedCalls = useSelector(
    (state) => state.calls.data.filter((el) => el.is_archived === false),
    shallowEqual
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab
          onClick={() => history.push(ACTIVITY_FEED_ROUTE)}
          icon={<PhoneIcon />}
          iconPosition="bottom"
          label={<div className={classes.label}>{notArhivedCalls.length} </div>}
        />
        <Tab
          onClick={() => history.push(ARCHIVED_LIST_ROUTE)}
          icon={<ArchiveIcon />}
          iconPosition="bottom"
          label={
            <div className={classes.label}>{onlyArchivedCalls.length}</div>
          }
        />
        {/* <Tab
          icon={<ContactsIcon />}
          iconPosition="bottom"
          label={<div className={classes.label}>12</div>}
        /> */}
      </Tabs>
    </div>
  );
}
