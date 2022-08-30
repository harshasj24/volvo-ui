import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.css";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CssBaseline, MenuItem, Paper, Tooltip } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import menu from "../../assets/menu.svg";
import profile from "../../assets/profile.svg";
import logo from "../../assets/volvo-logo.svg";
import { useLocation } from "react-router-dom";
import { useApi } from "../../context/api-provider";
import LogoutIcon from "@mui/icons-material/Logout";
import UseLocalStorage from "../../hooks/local-storage";
export default function Navbar() {
  const { pathname } = useLocation();
  const { logout } = useApi();
  const { role } = useApi();
  return (
    <div className="navbar">
      <AppBar
        // position="fixed"
        elevation={1}
        // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        {/* <Paper className="paper"> */}
        <header>
          <div className="header-nav d-flex align-items-center">
            <IconButton color="inherit">
              <img src={menu} alt="" />
            </IconButton>
            <img src={logo} alt="" />

            <div className="account">
              <img src={profile} alt="" />
              <h6 className="mt-1">{role?.name || ""}</h6>
            </div>
          </div>

          {pathname !== "/login" && (
            <div className="header-lookup d-flex align-items-center p-1 bg-light text-dark">
              {/* <KeyboardDoubleArrowRightIcon /> */}
              <Typography ml={3}>Vehicle lookup</Typography>
              <Tooltip title="Logout">
                <IconButton size="small" onClick={logout} className="ms-auto">
                  <LogoutIcon fontSize="small" color="primary" />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </header>
        {/* </Paper>/ */}
      </AppBar>
    </div>
  );
}
