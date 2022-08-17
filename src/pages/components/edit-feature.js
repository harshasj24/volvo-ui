import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";

import React from "react";
import BasicSelect from "../../shared/select/basic-select";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobal } from "../../context/global-states.provider";
const EditFeature = ({ handelClose }) => {
  const { selectedFeature, featureDetails, resetSelcted } = useGlobal();
  const handleclick = () => {
    handelClose();
    resetSelcted();
  };
  return (
    <Card sx={{ width: "40%" }}>
      <CardHeader
        title={"Content update"}
        subheader={"lorem epsum dolor sit emit"}
        action={
          <IconButton onClick={handleclick}>
            <CloseIcon />
          </IconButton>
        }
      />
      <hr style={{ margin: 0 }} />
      <CardContent>
        <div className="select">
          <BasicSelect className="" />
        </div>

        <TextField
          variant="outlined"
          className="mt-3 w-100"
          value={featureDetails}
          multiline
          minRows={6}
          maxRows={10}
          label="Details"
        />
      </CardContent>
      <hr />
      <CardActions className="pb-4">
        <Button
          variant="outlined"
          size="small"
          className="ms-auto"
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
