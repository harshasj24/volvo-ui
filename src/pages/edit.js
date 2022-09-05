import {
  AppBar,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Paper,
  Toolbar,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import React, { useEffect, useRef, useState } from "react";
import { useApi } from "../context/api-provider";
import EditFeature from "./components/edit-feature";
import FeatureCard from "./components/feature-card";
import "./edit.css";
import EditIcon from "@mui/icons-material/Edit";
import PricingTabel from "./components/pricing-tabel";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import CachedIcon from "@mui/icons-material/Cached";
import BasicSelect from "../shared/select/basic-select";
import { useBreakePoint } from "../context/breake-points";
import { GovtInfo } from "./components/govt-info";
import { useSearchParams, useParams } from "react-router-dom";
import Dealer from "../shared/autocomplete/dealer";

import ReactToPrint from "react-to-print";
const Edit = () => {
  const {
    feature,
    getVechicleFeature,
    demoResponce,
    monronyLabel,
    getpricings,
    logout,
    getALLMonroneyFeature,
    monronyFeatures,
    header,
  } = useApi();

  const ref = useRef(true);
  const keys = Object.keys(feature);
  const [pricingKeys, setPricingKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const { breakepointObserver, checkBreakPoint } = useBreakePoint();

  const { vin } = useParams();

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      // getVechicleFeature();
      console.log(vin);
      getALLMonroneyFeature(vin);
      getAllfeatures();
    }
    console.log(header);
    try {
      setPricingKeys(Object.keys(feature["pricing"]));
    } catch (error) {
      setPricingKeys([]);
    }
    breakepointObserver();
  }, [feature, monronyFeatures, header]);
  const getAllfeatures = async () => {
    const data = await demoResponce();
    setFeatures(data);
  };

  const handelClose = () => {
    setOpen(false);
  };
  const handelOpen = () => {
    setOpen(true);
  };
  const filterFeatures = (title) => {
    return features.filter((value) => {
      return value.name == title;
    })[0];
  };
  let feArr = ["performance", "pricing"];
  let componentRef = useRef();
  return (
    <div className="edit">
      <div className="edit__header w-100">
        <Toolbar />
        <header className="d-flex mb-3 shadow-sm px-3 pb-3 d-flex align-items-center font-vn-regular mt-3">
          <div className="title">
            <Typography
              margin={0}
              fontWeight={"bold"}
              fontSize={"1rem"}
              variant="h6"
              className="head"
              fontFamily="inherit"
            >
              {header?.model_no} T6 AWD INSCRIPTION
            </Typography>
            <Typography fontFamily="inherit" variant="p">
              {vin}
            </Typography>
          </div>

          <div className="select d-flex">
            {/* <BasicSelect title={"Allocation"} options={"allocation"} /> */}
            <Dealer />
            <BasicSelect title={"Status"} options={"status"} />
          </div>
          <div className="actions ms-auto">
            {/* <Button
              sx={{ textTransform: "capitalize" }}
              className="mx-3"
              size="small"
              variant="outlined"
            >
              <CachedIcon fontSize="small" />
              {checkBreakPoint("laptop", "desktop") && (
                <span className="ms-2">Refresh Data</span>
              )}
            </Button> */}
            {/* <Button
              sx={{ textTransform: "capitalize" }}
              size="small"
              variant="outlined"
            >
              <LocalPrintshopIcon fontSize="small" />
              {checkBreakPoint("laptop", "desktop") && (
                <span className="ms-2">Print</span>
              )}
            </Button> */}
            <ReactToPrint
              trigger={() => (
                <Button
                  sx={{ textTransform: "capitalize" }}
                  size="small"
                  variant="outlined"
                >
                  <LocalPrintshopIcon fontSize="small" />
                  {checkBreakPoint("laptop", "desktop") && (
                    <span className="ms-2">Print</span>
                  )}
                </Button>
              )}
              content={() => componentRef}
            />
          </div>
        </header>
      </div>
      <div className="edit-body__header p-3">
        <div className="header-left">
          <p>{header?.year} </p>
          <h1 class="font-broad-pro">{header?.model_no} T6 AWD INSCRIPTION</h1>
        </div>
        <div className="header-right ms-auto mt-3">
          <p>{header?.company_name}</p>
          <p>{header?.URL}</p>
        </div>
      </div>
      <div className="edit__body--wrapper" ref={(el) => (componentRef = el)}>
        <div className="monroney--columns">
          {Object.keys(monronyFeatures).map((key, i) => {
            return (
              <FeatureCard
                handelOpen={handelOpen}
                key={i}
                feature={monronyFeatures[key]}
              />
            );
          })}
        </div>
        <div className="monroney-govt">
          <GovtInfo />
        </div>
      </div>
      <Modal open={open}>
        <div className="modal-body">
          <EditFeature handelClose={handelClose} />
        </div>
      </Modal>
    </div>
  );
};

export default Edit;
