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
import axios from "axios";
const Edit = () => {
  const {
    feature,
    getVechicleFeature,
    demoResponce,
    monronyLabel,
    getpricings,
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
      getVechicleFeature();
      getAllfeatures();
    }

    try {
      setPricingKeys(Object.keys(feature["pricing"]));
    } catch (error) {
      setPricingKeys([]);
    }
    breakepointObserver();
  }, [feature]);
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
  return (
    <div className="edit">
      <div className="edit__header w-100">
        <Toolbar />
        <header className="d-flex mb-3 shadow-sm px-3 pb-3 d-flex align-items-center font-vn-regular">
          <div className="title">
            <Typography
              margin={0}
              fontWeight={"bold"}
              fontSize={"1rem"}
              variant="h6"
              className="head"
              fontFamily="inherit"
            >
              S90 T6 AWD INSCRIPTION
            </Typography>
            <Typography fontFamily="inherit" variant="p" fontSize={".8rem"}>
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
          </div>
        </header>
      </div>
      <div className="edit__body ">
        <Grid container spacing={-2} padding={2}>
          <Grid item xs={12} md={8}>
            <div className="features">
              <div className="features__head font-vn-regular">
                <span>Volvo 2022</span>
                <Typography fontFamily="inherit" variant="h4">
                  {" "}
                  S90 T6 AWD INSCRIPTION
                </Typography>
              </div>
              <div className="features__body mt-2 ">
                <Grid container spacing={-2}>
                  <Grid item xs={12} sm={4}>
                    {
                      // ["performance","audio and technology"," safety and security"]
                      keys.slice(1, 4).map((key) => {
                        return (
                          <div className="fetures mb-3">
                            <FeatureCard
                              handelOpen={handelOpen}
                              key={key}
                              title={key.replaceAll("_", " ")}
                              details={feature[key]}
                              arr={filterFeatures("pricing")}
                            />
                          </div>
                        );
                      })
                    }
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {keys.slice(4, 9).map((key) => {
                      return (
                        <div className="fetures mb-3">
                          <FeatureCard
                            key={key}
                            handelOpen={handelOpen}
                            title={key.replaceAll("_", " ")}
                            details={feature[key]}
                          />
                        </div>
                      );
                    })}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FeatureCard handelOpen={handelOpen} title={"pricing"}>
                      <table>
                        <tbody>
                          {pricingKeys.map((key, index) => {
                            return (
                              <tr key={index}>
                                <td>{key.replaceAll("_", " ")}</td>
                                <td>{feature["pricing"][key]}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </FeatureCard>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid className="" item xs={12} md={4}>
            <div className="gov-infoi border h-100">
              <GovtInfo />
            </div>
          </Grid>
        </Grid>
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
