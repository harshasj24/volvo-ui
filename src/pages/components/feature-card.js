import React, { useEffect, useRef, useState } from "react";
// import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { IconButton, Typography } from "@mui/material";
import "./features.css";
import { useGlobal } from "../../context/global-states.provider";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import LongMenu from "./long-menu";
import { useApi } from "../../context/api-provider";
const FeatureCard = ({ title, children, handelOpen, arr, feature }) => {
  const { selectedFeature } = useGlobal();
  const [details, setDetails] = useState("");
  // const [features, setFeatures] = useState();
  const getDetails = () => {
    try {
      if (feature.title === "authorized_retailer") {
        setDetails(feature?.address);
      } else {
        Object.keys(feature?.features).map((key) => {
          setDetails((prev) => {
            return prev + feature?.features[key] + "\n";
          });
        });
      }
    } catch (error) {}
  };
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
    selectFeature(title);
    console.log(title);
    title === "pricing" && getMonroneyFeature(title);
  };
  const ref = useRef(true);
  useEffect(() => {
    console.log(feature?.features);
    if (ref.current) {
      getDetails();
      ref.current = false;
    }
  }, [feature]);
  // console.log(details);
  return (
    <div className={`p-1 ${active("", activeClass)}`}>
      <div className="feature-card__header  d-flex align-items-center font-vn-regular">
        <Typography
          textTransform={"uppercase"}
          fontWeight={"bold"}
          variant="p"
          fontSize={".8rem"}
          fontFamily="inherit"
        >
          {feature.title || "warranty"}
        </Typography>
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
      <div className="feature-card__body font-vn-light">
        <Typography
          variant=""
          fontFamily={"inherit"}
          fontWeight={"600"}
          fontSize={"0.7rem"}
        >
          {details}
        </Typography>
      </div>
    </div>
  );
};

export default FeatureCard;
