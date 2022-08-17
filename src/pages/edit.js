import { Grid, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useApi } from "../context/api-provider";
import FeatureCard from "./components/feature-card";
import "./edit.css";

const Edit = () => {
  const { feature, getVechicleFeature } = useApi();
  const ref = useRef(true);
  const keys = Object.keys(feature);
  console.log(keys);
  useEffect(() => {
    if (ref.current) {
      getVechicleFeature();
      ref.current = false;
    }
  }, []);

  return (
    <div className="p-3">
      <Toolbar />
      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <div className="features">
            <div className="features__head">
              <Typography variant="h4"> S90 T6 AWD INSCRIPTION</Typography>
            </div>
            <div className="features__body mt-5">
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  {keys.slice(0, 4).map((key) => {
                    return (
                      <div className="fetures mb-3">
                        <FeatureCard title={key} details={feature[key]} />
                      </div>
                    );
                  })}
                </Grid>
                <Grid item xs={4}>
                  {keys.splice(4, 5).map((key) => {
                    return (
                      <div className="fetures mb-3">
                        <FeatureCard title={key} details={feature[key]} />
                      </div>
                    );
                  })}
                </Grid>
                <Grid item xs={4}>
                  <FeatureCard title={"ash"} />
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid className="border" item xs={12} lg={4}></Grid>
      </Grid>
    </div>
  );
};

export default Edit;
