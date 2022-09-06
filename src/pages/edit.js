import { Modal, Toolbar, Typography, Button, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useApi } from "../context/api-provider";
import EditFeature from "./components/edit-feature";
import FeatureCard from "./components/feature-card";
import "./edit.css";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import BasicSelect from "../shared/select/basic-select";
import { useBreakePoint } from "../context/breake-points";
import { GovtInfo } from "./components/govt-info";
import { useParams } from "react-router-dom";
import Dealer from "../shared/autocomplete/dealer";
import ShareIcon from "@mui/icons-material/Share";
import ReactToPrint from "react-to-print";
import shareIcon from "../assets/share-icon.svg";
import printIcon from "../assets/print-icon.svg";
import Loader from "../shared/loader";
const Edit = () => {
  const {
    feature,
    getConfigDetails,
    demoResponce,
    vinLoad,
    getALLMonroneyFeature,
    monronyFeatures,
    header,
  } = useApi();

  const ref = useRef(true);
  const keys = Object.keys(feature);
  const [pricingKeys, setPricingKeys] = useState([]);
  const [configurations, setConfigurations] = useState([]);
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const { breakepointObserver, checkBreakPoint } = useBreakePoint();

  const { vin } = useParams();

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      // getVechicleFeature();

      getALLMonroneyFeature(vin);
      getAllfeatures();
      getConfig();
    }

    try {
      setPricingKeys(Object.keys(feature["pricing"]));
    } catch (error) {
      setPricingKeys([]);
    }
    breakepointObserver();
    console.log(vinLoad)
  }, [feature, monronyFeatures, header, vinLoad]);

  const getConfig = async (_) => {
    let value = await getConfigDetails();
    setConfigurations(value);
  };

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
    <div className="main-body--wrapper">
      <div className="edit__header w-100">
        <Toolbar />
        <header
          style={{
            paddingLeft: 0,
            borderBottom: "1px solid #D8D8D8",
          }}
          className="d-flex mb-3  px-3 pb-3 d-flex align-items-center font-vn-regular mt-3"
        >
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
                <Button sx={{ textTransform: "capitalize" }} variant="outlined">
                  <img src={printIcon} alt="" />
                  {checkBreakPoint("laptop", "desktop") && (
                    <span style={{ color: "#0056D6" }} className="ms-2">
                      Print
                    </span>
                  )}
                </Button>
              )}
              content={() => componentRef}
            />
            <Button sx={{ marginLeft: "12px" }} variant="outlined">
              <img src={shareIcon} alt="" />{" "}
              <span style={{ color: "#0056D6" }} className="ms-2">
                Share
              </span>
            </Button>
          </div>
        </header>
      </div>

      <div className="edit__body--wrapper" ref={(el) => (componentRef = el)}>
        <div>
          <div className="edit-body__header">
            <div className="header-left">
              <p>{header?.year} </p>
              <h1 class="font-broad-pro">
                {header?.model_no} T6 AWD INSCRIPTION
              </h1>
            </div>
            <div className="header-right ms-auto mt-3">
              <p>{header?.company_name}</p>
              <p>{header?.URL}</p>
            </div>
          </div>
          <div className="monroney--columns">
            {configurations?.length > 0 &&
              Object.keys(monronyFeatures).map((key, i) => {
                return (
                  <FeatureCard
                    handelOpen={handelOpen}
                    key={i}
                    feature={monronyFeatures[key]}
                    configurations={configurations}
                  />
                );
              })}
          </div>
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
      {vinLoad && <Loader open={vinLoad}/>}
    </div>
  );
};

export default Edit;
