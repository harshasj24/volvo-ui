import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import "./admin.css";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import TabPanel from "./components/tab-panel";
import flag from "../assets/flag.svg";
import dots from "../assets/dots.svg";
const AdminRules = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const featuresAdmin = [
    {
      order_no: 1,
      sectionName: "PERFORMANCE",
      icon: flag,
      canEdit: "yes",
      rules: "Conditional",
    },

    {
      order_no: 1,
      sectionName: "AUDIO AND TECHNOLOGY",
      icon: flag,
      canEdit: "yes",
      rules: "N/A",
    },
    {
      order_no: 1,
      sectionName: "SAFETY AND SECURITY",
      icon: flag,
      canEdit: "yes",
      rules: "N/A",
    },
    {
      order_no: 1,
      sectionName: "LUXURY AND CONVENIENCE",
      icon: flag,
      canEdit: "yes",
      rules: "N/A",
    },
    {
      order_no: 1,
      sectionName: "AUTHORIZED RETAILER",
      icon: flag,
      canEdit: "yes",
      rules: "N/A",
    },
    {
      order_no: 1,
      sectionName: "JOIN THE CONVERSATION",
      icon: flag,
      canEdit: "yes",
      rules: "N/A",
    },
    {
      order_no: 1,
      sectionName: "WARRANTY",
      icon: flag,
      canEdit: "yes",
      rules: "Conditional",
    },
    {
      order_no: 1,
      sectionName: "PRICING - base",
      icon: flag,
      canEdit: "No",
      rules: "Conditional",
    },
    {
      order_no: 1,
      sectionName: "PRICING - DIO",
      icon: flag,
      canEdit: "yes",
      rules: "Conditional",
    },
    {
      order_no: 1,
      sectionName: "PRICING - Total ",
      icon: flag,
      canEdit: "No",
      rules: "N/A",
    },
  ];
  return (
    <div>
      <Toolbar className="mt-4" />
      <div className="admin-tabs">
        <h4 className="admin-tabs__header">Settings</h4>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Features" id="0" />
              <Tab label="Fuel and Safety" id="1" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Order no.</TableCell>
                  <TableCell>Section Name</TableCell>
                  <TableCell align="center">Icon</TableCell>
                  <TableCell align="center">Can Edit</TableCell>
                  <TableCell align="center">Rules</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {featuresAdmin.map((fea) => (
                  <TableRow sx={{ border: "none" }}>
                    <TableCell
                      align="center"
                      className="tabel-cell"
                      sx={{ border: "none" }}
                      width={70}
                    >
                      {fea.order_no}
                    </TableCell>
                    <TableCell sx={{ border: "none" }} width={120}>
                      {fea.sectionName}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="tabel-cell"
                      width={100}
                      sx={{ border: "none" }}
                    >
                      <img src={fea.icon} alt="" />
                    </TableCell>
                    <TableCell
                      align="center"
                      className="tabel-cell"
                      width={100}
                      sx={{ border: "none" }}
                    >
                      {fea.canEdit}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="tabel-cell"
                      width={10}
                      sx={{ border: "none" }}
                    >
                      {fea.rules}
                    </TableCell>
                    <TableCell
                      width={10}
                      align="center"
                      className="tabel-cell"
                      sx={{ border: "none" }}
                    >
                      <IconButton>
                        <img src={dots} alt="" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default AdminRules;
