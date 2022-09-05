import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import "./admin.css";
import indicator from "../assets/indicator.svg";
import {
  Button,
  IconButton,
  LinearProgress,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import TabPanel from "./components/tab-panel";
import flag from "../assets/flag.svg";
import dots from "../assets/dots.svg";
import BasicSelect from "../shared/select/basic-select";
import { useState } from "react";
import { useApi } from "../context/api-provider";
import { useEffect } from "react";
import { useRef } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InfoIcon from "@mui/icons-material/Info";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwitterIcon from "@mui/icons-material/Twitter";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import seatBelt from "../assets/seat-belt-svgrepo-com.svg";
import { useFormik } from "formik";
const AdminRules = () => {
  const [loaded, setloaded] = useState(false);
  const {
    getConfigurations,
    updateConfiguration,
    configurations,
    getConfiguration,
  } = useApi();
  const [configuration, setConfiguration] = useState({});
  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // setConfiguration({});
    setOpen(false);
  };
  const handelActionClick = (sectionName) => async () => {
    setloaded(true);
    const responce = await getConfiguration(sectionName);
    setConfiguration(responce.data);
    setloaded(false);
    handleOpen();
    console.log(responce);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const formik = useFormik({
    initialValues: { ...configuration },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      updateConfiguration(values);
      handleClose();
    },
  });

  const iconsSet = {
    flag: <img src={flag} alt="" />,
    audio: <VolumeUpIcon />,
    dollar: <MonetizationOnIcon />,
    info: <InfoIcon />,
    car: <DirectionsCarIcon />,
    twitter: <TwitterIcon />,
    medal: <WorkspacePremiumIcon />,
    seatbelt: <img width={"20px"} src={seatBelt} alt="" />,
  };

  const ref = useRef(true);
  useEffect(() => {
    if (ref.current) {
      getConfigurations();
      ref.current = false;
    }
    console.log(configurations);
  }, [configurations]);
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
                {configurations.map((fea, i) => (
                  <TableRow key={i} sx={{ border: "none" }}>
                    <TableCell
                      align="center"
                      className="tabel-cell"
                      sx={{ border: "none" }}
                      width={70}
                    >
                      {fea.display_order}
                    </TableCell>
                    <TableCell
                      className="tabel-cell"
                      sx={{ border: "none" }}
                      width={110}
                    >
                      {fea.section_name}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="tabel-cell"
                      width={100}
                      sx={{ border: "none" }}
                    >
                      {iconsSet[fea?.icon.toLowerCase()]}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="tabel-cell"
                      width={100}
                      sx={{ border: "none" }}
                    >
                      {fea.is_edit}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="tabel-cell"
                      width={10}
                      sx={{ border: "none" }}
                    >
                      {fea.rule_definition}
                    </TableCell>
                    <TableCell
                      width={10}
                      align="center"
                      className="tabel-cell"
                      sx={{ border: "none" }}
                    >
                      <IconButton onClick={handelActionClick(fea.section_name)}>
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
      <Modal open={open}>
        <div className="admin-modal">
          <div className="admin-modal__header">
            <p>Feature Definition and Rules</p>
          </div>
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="admin-modal__body">
              <div className="body__title">Title and display</div>
              <div className="body-text-fields1 d-flex mt-3">
                <BasicSelect
                  width={100}
                  title={"Order Number"}
                  name="display_order"
                  setFieldValue={formik.setFieldValue}
                  defaultValue={formik.values?.display_order}
                  options={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                />
                <TextField
                  sx={{ width: "311px", mx: "18px" }}
                  size="small"
                  label="Section Name"
                  name="section_name"
                  value={formik.values?.section_name}
                  disabled
                />
                <BasicSelect
                  width={190}
                  title={"Icon"}
                  name="icon"
                  setFieldValue={formik.setFieldValue}
                  defaultValue={formik.values?.icon?.toLowerCase()}
                  options={[...Object.keys(iconsSet)]}
                />
              </div>
              <div className="title2 ">
                <p>Set Rule</p>
              </div>
              <div className="body-text-fields2 d-flex  gap-3 mt-4">
                <BasicSelect
                  width={212}
                  title={"If this field"}
                  options={["status"]}
                />

                <BasicSelect
                  width={185}
                  title={"condition"}
                  name="rule_definition"
                  setFieldValue={formik.setFieldValue}
                  defaultValue={formik.values?.rule_definition}
                  options={[
                    "Status equals Allocated",
                    "Status equals Not Allocated",
                  ]}
                />
                <BasicSelect
                  width={197}
                  title={"Value"}
                  name={"is_edit"}
                  setFieldValue={formik.setFieldValue}
                  defaultValue={formik.values?.is_edit}
                  options={["Editable", "Not editable"]}
                />
              </div>
              <div className="title2 ">
                <p>Then</p>
              </div>
              <div className="body-text-fields3 mt-3">
                <BasicSelect
                  width={215}
                  title={"Field"}
                  options={["Not Editable"]}
                />
              </div>
              <Button className="mt-3"> + Add Condition</Button>
            </div>

            <div className="admin-modal__footer d-flex align-items-center ">
              <Button
                type="buton"
                variant="outlined"
                size="small"
                color="primary"
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                size="small"
                type="button"
                className="ms-auto"
                color="primary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className=""
                size="small"
                color="primary"
                sx={{ marginLeft: "20px" }}
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AdminRules;
