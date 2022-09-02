import React, { useEffect, useRef, useState } from "react";
// import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { IconButton, Typography } from "@mui/material";
import "./features.css";
import { useGlobal } from "../../context/global-states.provider";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import LongMenu from "./long-menu";
import { useApi } from "../../context/api-provider";
const FeatureCard = ({ title, children, handelOpen, arr, feature }) => {
  const { selectedFeature, getDetails } = useGlobal();
  const { getVechicleFeature } = useApi();
  const [details, setDetails] = useState("");
  // const [features, setFeatures] = useState();
  // const getDetails = () => {
  //   try {
  //     if (feature.title === "authorized_retailer") {
  //       setDetails(feature?.address);
  //     } else {
  //       Object.keys(feature?.features).map((key) => {
  //         setDetails((prev) => {
  //           return prev + feature?.features[key] + "\n";
  //         });
  //       });
  //     }
  //   } catch (error) {}
  // };
  const activeClass = "shadow active-boder";
  const { getMonroneyFeature } = useApi();
  const active = (defaultValue, value) => {
    if (selectedFeature.toLowerCase() === title) {
      return value;
    }
    return defaultValue;
  };
  const { selectFeature } = useGlobal();
  const handelClick = () => {
    handelOpen();
    selectFeature(feature.title);
    getVechicleFeature(feature.title);

    title === "pricing" && getMonroneyFeature(title);
  };
  const ref = useRef(true);
  useEffect(() => {
    if (ref.current) {
      getDetails(feature, setDetails);
      ref.current = false;
    }
  }, [feature, details]);

  return (
    <div>
      <div className="feature-card__header  d-flex align-items-center">
        {feature.title}
        <div className="header-icon ms-auto">
          {
            <LongMenu openModel={handelClick} /> /* {active(
              // <IconButton>
              <AssistantPhotoIcon onClick={handelClick} />,
              // </IconButton>,
              <BorderColorOutlinedIcon color="primary" />
            )} */
          }
        </div>
      </div>
      <div className="feature-card__body">{details}</div>
    </div>
  );
};

export default FeatureCard;
