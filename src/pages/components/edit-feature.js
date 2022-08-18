import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  InputLabel,
  FormControlLabel,
} from "@mui/material";

import React, { useState } from "react";
import BasicSelect from "../../shared/select/basic-select";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobal } from "../../context/global-states.provider";
import "./editfeature.css";
const EditFeature = ({ handelClose }) => {
  const { selectedFeature, featureDetails, resetSelcted } = useGlobal();
  const [select, setSelect] = useState(false);
  const handleclick = (close) => () => {
    close && handelClose();
    resetSelcted();
    setSelect(true);
    setTimeout(() => {
      setSelect(false);
    });
  };
  return (
    <Card sx={{ width: "40%" }}>
      <CardHeader
        title={"Content update"}
        subheader={"lorem epsum dolor sit emit"}
        action={
          <IconButton onClick={handleclick(true)}>
            <CloseIcon />
          </IconButton>
        }
      />
      <hr style={{ margin: 0 }} />
      <CardContent>
        <div className="select">
          <BasicSelect select={select} className="" />
        </div>

        {selectedFeature === "Pricing" ? (
          <div className="pricing-field">
            {Object.keys(featureDetails).map((key) => {
              return (
                <TextField
                  className="m-2"
                  defaultValue={featureDetails[key]}
                  label={key.replaceAll("_", " ")}
                />
              );
            })}
          </div>
        ) : (
          <div>
            <TextField
              variant="outlined"
              className="mt-3 w-100 feature-details"
              defaultValue={featureDetails}
              multiline
              minRows={6}
              maxRows={10}
              label="Details"
              InputLabelProps={{ shrink: true }}
              sx={{
                border: "none",
                outline: "none",
              }}
            />
          </div>
        )}
      </CardContent>
      <hr />
      <CardActions className="pb-4">
        <Button
          variant="outlined"
          size="small"
          className="ms-auto"
          onClick={handleclick(false)}
          color="error"
        >
          refresh
        </Button>
        <Button variant="contained" className="" size="small" color="error">
          Update
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditFeature;
