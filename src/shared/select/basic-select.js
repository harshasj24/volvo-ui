import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGlobal } from "../../context/global-states.provider";

export default function BasicSelect({ select }) {
  const [feature, setFeature] = React.useState("");
  const { selectFeature, selectedFeature } = useGlobal();
  const handleChange = (event) => {
    const selected = event.target.value;
    selectFeature(selected);
    setFeature(event.target.value);
    // setFeature("selectedFeature");
  };
  React.useEffect(() => {
    console.log(select);
    select && setFeature("");
    selectedFeature && setFeature(selectedFeature);
  }, [select, selectedFeature]);
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

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Call-out</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{ textTransform: "capitalize" }}
          value={feature}
          label="Call-out"
          onChange={handleChange}
        >
          {features.map((feature) => {
            return (
              <MenuItem sx={{ textTransform: "capitalize" }} value={feature}>
                {feature}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
