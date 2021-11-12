import * as React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { getDate } from "../utils/getDate";
import { toggleArchiveCallAction } from "../redux/action-creator/toggleArchiveCallAction";
import { Loader } from "../components/Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 285,
  height: 240,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  detailsRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    borderBottom: "1px dashed grey",
  },
  closeIcon: {
    display: "flex",
    justifyContent: "end",
  },
  addToArchive: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    justifyContent: "center",
    color: "#9c27b0",
    cursor: "pointer",
  },
});

export const DetailsPage = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();
  const id = props.location.state.id;
  const call = useSelector(
    (state) => state.calls.data.find((el) => el.id === id),
    shallowEqual
  );
  const loading = useSelector((state) => state.calls.loading);
  const error = useSelector((state) => state.calls.error);

  const handleClose = () => {
    history.goBack();
    setOpen(false);
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={classes.closeIcon}>
              <div onClick={handleClose} style={{ cursor: "pointer" }}>
                <HighlightOffIcon color="error" />
              </div>
            </div>
            <div className={classes.detailsRow}>
              <div>Call type</div> <div>{call.call_type?.toUpperCase()}</div>
            </div>
            <div className={classes.detailsRow}>
              <div>Call date</div>
              <div>{getDate(call.created_at).toUpperCase()}</div>
            </div>
            <div className={classes.detailsRow}>
              <div>Duration</div> <div>{call.duration}</div>
            </div>
            <div className={classes.detailsRow}>
              <div>Call via</div> <div>{call.via.toUpperCase()}</div>
            </div>
            <div className={classes.detailsRow}>
              <div>In archive</div> <div>{call.is_archived ? "YES" : "NO"}</div>
            </div>

            <div
              onClick={() => dispatch(toggleArchiveCallAction(call))}
              className={classes.addToArchive}
            >
              {!call.is_archived ? (
                <>
                  <div>Add to archive</div>
                  <div>
                    <AddBoxIcon />
                  </div>
                </>
              ) : (
                <>
                  <div>Delete from archive</div>
                  <div>
                    <DeleteIcon />
                  </div>
                </>
              )}
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};
