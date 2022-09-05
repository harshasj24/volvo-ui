import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGlobal } from "../../context/global-states.provider";

export default function BasicSelect({
  defaultValue,
  disabled,
  select,
  title,
  options,
  width,
  name,
  setFieldValue,
}) {
  const [feature, setFeature] = React.useState("");
  const { selectFeature, selectedFeature } = useGlobal();
  const handleChange = (event) => {
    const selected = event.target.value;
    selectFeature(selected);
    setFeature(event.target.value);
    // setFeature("selectedFeature");
    setFieldValue && setFieldValue(name, event.target.value);
  };
  React.useEffect(() => {
    select && setFeature("");
    selectedFeature && setFeature(selectedFeature);
  }, []);
  const features = [
    "performance",
    "audio and technology",
    "safety and security",
    "luxury and convenience",
    "authorized retailer",
    "warranty",
    "mainataince",
    "accessories",
    "join the converstion",
    "pricing",
  ];

  const status = ["Allocated", "Not Allocated"];

  const allocation = ["7149-Volvo Cars Athens"];
  const setDefault = () => {
    if (!defaultValue) return;
    setFeature(defaultValue);
  };
  React.useEffect(() => {
    setDefault();
  }, [defaultValue]);
  const getOptions = () => {
    if (options === "features") {
      return feature;
    } else if (options === "status") {
      return status;
    } else if (options === "allocation") {
      return allocation;
    } else {
      return options;
    }
  };
  return (
    <Box sx={{ width: width || 180 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{ textTransform: "capitalize" }}
          value={feature}
          label={title}
          fullWidth
          name={name}
          onChange={handleChange}
          disabled={disabled}
        >
          {getOptions().map((option, i) => {
            return (
              <MenuItem
                key={i}
                sx={{ textTransform: "capitalize" }}
                value={option}
              >
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
