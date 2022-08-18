import React from "react";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { Typography } from "@mui/material";
import "./features.css";
import { useGlobal } from "../../context/global-states.provider";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
const FeatureCard = ({ title, details, children }) => {
  const { selectedFeature } = useGlobal();
  const activeClass = "shadow active-boder";
  const active = (defaultValue, value) => {
    if (selectedFeature.toLowerCase() === title) {
      return value;
    }
    return defaultValue;
  };
  return (
    <div>
      <div className={`feature-card p-1 ${active("", activeClass)}`}>
        <div className="feature-card__header  d-flex">
          <Typography
            textTransform={"uppercase"}
            fontWeight={"bold"}
            variant="p"
            fontSize={".8rem"}
          >
            {title}
          </Typography>
          <div className="header-icon ms-auto">
            {active(
              <AssistantPhotoIcon />,
              <BorderColorOutlinedIcon color="primary" />
            )}
          </div>
        </div>
        <div className="feature-card__body">
          <Typography variant="" fontWeight={"600"} fontSize={"0.6rem"}>
            {details || children}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
