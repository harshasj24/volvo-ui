import {
  Modal,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useApi } from "../context/api-provider";
import EditFeature from "../pages/components/edit-feature";
import "./view.css";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useBreakePoint } from "../context/breake-points";
import { GovtInfo } from "../pages/components/govt-info";
import { useParams } from "react-router-dom";

import ReactToPrint from "react-to-print";
import FeatureCardView from "./feature-card-view";
import Loader from "../shared/loader";
const View = () => {
  const {
    feature,
    demoResponce,
    getALLMonroneyFeature,
    monronyFeatures,
    header,
    vinLoad
  } = useApi();

  const ref = useRef(true);
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
  let componentRef = useRef();
  return (
    <div className="main-body--wrapper">
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

          <div className="actions ms-auto">
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
            {Object.keys(monronyFeatures).map((key, i) => {
              return (
                <FeatureCardView
                  handelOpen={handelOpen}
                  key={i}
                  feature={monronyFeatures[key]}
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

export default View;
