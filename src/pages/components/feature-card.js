import React, { useEffect, useState } from "react";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { IconButton, Typography } from "@mui/material";
import "./features.css";
import { useGlobal } from "../../context/global-states.provider";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import LongMenu from "./long-menu";
import { useApi } from "../../context/api-provider";
const FeatureCard = ({ title, details, children, handelOpen, arr }) => {
  const { selectedFeature } = useGlobal();
  const [features, setFeatures] = useState();
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

  useEffect(() => {}, [arr]);

  return (
    <div className={`feature-card p-1 ${active("", activeClass)}`}>
      <div className="feature-card__header  d-flex align-items-center font-vn-regular">
        <Typography
          textTransform={"uppercase"}
          fontWeight={"bold"}
          variant="p"
          fontSize={".8rem"}
          fontFamily="inherit"
        >
          {title}
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
          fontSize={"0.6rem"}
        >
          {details || children}
        </Typography>
      </div>
    </div>
  );
};

export default FeatureCard;
