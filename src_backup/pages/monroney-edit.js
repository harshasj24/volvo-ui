import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import TabPanel from "./components/tab-panel";
import { useTheme } from "@emotion/react";
import Features from "./components/features";
import EGInfo from "./components/eg-info";
import BasicSelect from "../shared/select/basic-select";
import { useBreakePoint } from "../context/breake-points";

// import SwipeableViews from "react-swipeable-views";
const drawerWidth = 390;

export default function MonroneyEdit() {
  const [value, setValue] = React.useState(0);
  const { breakPoint, breakepointObserver } = useBreakePoint();
  const [drawerOptions, setDrawerOptions] = React.useState({
    open: false,
    variant: "permanent",
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const theme = useTheme();
  React.useEffect(() => {
    breakepointObserver();
    handelDrawerBreakPoints();
  }, [breakPoint]);
  const handelDrawerBreakPoints = () => {
    if (breakPoint === "mobile" || breakPoint === "tablet") {
      setDrawerOptions({
        ...drawerOptions,
        variant: "temporary",
      });
    } else if (breakPoint === "laptop" || breakPoint === "desktop") {
      setDrawerOptions({
        ...drawerOptions,
        variant: "permanent",
      });
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        PaperProps={{ elevation: 3 }}
        open={drawerOptions.open}
        variant={drawerOptions.variant}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", padding: "10px" }}>
          {/* <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}

          <List>
            <ListItem>
              <Typography fontWeight={"bold"} variant="p">
                S90 T6 AWD INSCRIPTION
              </Typography>
            </ListItem>
            <ListItem sx={{ margin: 0 }}>
              <Typography fontSize={"0.8rem"}>V12LK45679WE1296</Typography>
            </ListItem>
          </List>

          <div className="tabs">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Features" />
              <Tab label="Economy & Govt Info" />
            </Tabs>
          </div>
          <div className="select mt-4">
            <BasicSelect className="mt-4" />
          </div>

          <TextField
            variant="outlined"
            className="mt-3 w-100"
            multiline
            minRows={9}
            maxRows={10}
            label="Details"
          />

          <div className="filed-actions mt-2 d-flex">
            <Button variant="outlined" size="small" color="error">
              refresh
            </Button>
            <Button
              className="ms-auto"
              variant="outlined"
              size="small"
              color="error"
            >
              Cancle
            </Button>
            <Button
              variant="contained"
              className="ms-2"
              size="small"
              color="error"
            >
              Update
            </Button>
          </div>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <TabPanel value={value} index={0} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}></TabPanel>
      </Box>
    </Box>
  );
}
