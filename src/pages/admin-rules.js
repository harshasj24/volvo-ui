import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import "./admin.css";
import {
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
                  <TableCell>Order no.</TableCell>
                  <TableCell>Section Name</TableCell>
                  <TableCell>Icon</TableCell>
                  <TableCell>Can Edit</TableCell>
                  <TableCell>Rules</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {featuresAdmin.map((fea) => (
                  <TableRow>
                    <TableCell width={100}>{fea.order_no}</TableCell>
                    <TableCell width={280}>{fea.sectionName}</TableCell>
                    <TableCell>
                      <img src={fea.icon} alt="" />
                    </TableCell>
                    <TableCell>{fea.canEdit}</TableCell>
                    <TableCell>{fea.rules}</TableCell>
                    <TableCell>{<img src={dots} alt="" />}</TableCell>
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
