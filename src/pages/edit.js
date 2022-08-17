import {
  AppBar,
  Card,
  Grid,
  IconButton,
  Modal,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useApi } from "../context/api-provider";
import EditFeature from "./components/edit-feature";
import FeatureCard from "./components/feature-card";
import "./edit.css";
import EditIcon from "@mui/icons-material/Edit";
const Edit = () => {
  const { feature, getVechicleFeature } = useApi();
  const ref = useRef(true);
  const keys = Object.keys(feature);
  const [pricingKeys, setPricingKeys] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      getVechicleFeature();
    }
    try {
      setPricingKeys(Object.keys(feature["pricing"]));
    } catch (error) {
      setPricingKeys([]);
    }
  }, [feature]);
  const handelClose = () => {
    setOpen(false);
  };
  const handelOpen = () => {
    setOpen(true);
  };
  return (
    <div className="">
      <Toolbar />
      <header className="d-flex mb-3 shadow-sm p-2 d-flex align-items-center">
        <IconButton onClick={handelOpen} className="ms-auto">
          <EditIcon />
        </IconButton>
      </header>
      <Grid container spacing={1} padding={2}>
        <Grid item xs={12} lg={8}>
          <div className="features">
            <div className="features__head">
              <span>Volvo 2022</span>
              <Typography variant="h4"> S90 T6 AWD INSCRIPTION</Typography>
            </div>
            <div className="features__body mt-2">
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  {keys.slice(0, 4).map((key) => {
                    return (
                      <div className="fetures mb-3">
                        <FeatureCard
                          title={key.replaceAll("_", " ")}
                          details={feature[key]}
                        />
                      </div>
                    );
                  })}
                </Grid>
                <Grid item xs={4}>
                  {keys.slice(4, 9).map((key) => {
                    return (
                      <div className="fetures mb-3">
                        <FeatureCard
                          title={key.replaceAll("_", " ")}
                          details={feature[key]}
                        />
                      </div>
                    );
                  })}
                </Grid>
                <Grid item xs={4}>
                  <FeatureCard title={"Pricing"}>
                    <table>
                      {pricingKeys.map((key) => {
                        return (
                          <tr>
                            <td>{key.replaceAll("_", " ")}</td>
                            <td>{feature["pricing"][key]}</td>
                          </tr>
                        );
                      })}
                    </table>
                  </FeatureCard>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid className="border" item xs={12} lg={4}></Grid>
      </Grid>
      <Modal open={open}>
        <div className="modal-body">
          <EditFeature handelClose={handelClose} />
        </div>
      </Modal>
    </div>
  );
};

export default Edit;
