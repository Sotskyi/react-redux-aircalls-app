import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  activityContainer: {},
  headerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  iconWrapper: {
    width: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
  },
});
export const CallsHeader = ({
  setIsShowVoiceMails,
  isShowVoiceMails,
  title,
}) => {
  const [value, setValue] = React.useState("one");
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIsShowVoiceMails(!isShowVoiceMails);
  };

  return (
    <div className={classes.headerContainer}>
      <div className={classes.iconWrapper}>
        <HomeIcon color="primary" />
        Activity
      </div>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label={title} sx={{ fontSize: "10px" }} />
          <Tab value="two" label="Inbox" sx={{ fontSize: "10px" }} />
        </Tabs>
      </Box>
    </div>
  );
};
