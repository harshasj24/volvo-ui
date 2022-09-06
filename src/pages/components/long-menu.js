import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./longmenu.css";

const ITEM_HEIGHT = 48;

export default function LongMenu({ openModel, featureTitle, secName, Edit }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelItemButton = () => {
    setAnchorEl(null);
    openModel();
  };

  return (
    <>
      {featureTitle === secName && Edit && (
        <div>
          <IconButton
            size="small"
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            sx={{ padding: 0 }}
            onClick={handleClick}
            // disabled={status}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem
              key={"Edit"}
              // selected={option === "Pyxis"}
              className="menu-item"
              onClick={handelItemButton}
            >
              <BorderColorOutlinedIcon fontSize="1" />
              <span className="ms-3">Edit Item</span>
            </MenuItem>
            <MenuItem
              className="menu-item"
              key={"Add"}
              // selected={option === "Pyxis"}
              onClick={handelItemButton}
            >
              <AddOutlinedIcon fontSize="1" />
              <span className="ms-3">Add Item</span>
            </MenuItem>
          </Menu>
        </div>
      )}
      {featureTitle === secName && !Edit && (
        <span className="disabled-feature">
          <IconButton
            size="small"
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            sx={{ padding: 0 }}
            onClick={handleClick}
            disabled={true}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </span>
      )}
    </>
  );
}
