import React from "react";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { Typography } from "@mui/material";
import "./features.css";
const FeatureCard = ({ title, details }) => {
  return (
    <div>
      <div className="feature-card">
        <div className="feature-card__header  d-flex">
          <Typography
            textTransform={"uppercase"}
            fontWeight={"bold"}
            variant="p"
          >
            {title}
          </Typography>
          <AssistantPhotoIcon className="ms-auto" />
        </div>
        <div className="feature-card__body">
          <Typography variant="" fontWeight={"600"} fontSize={"0.6rem"}>
            {details}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
