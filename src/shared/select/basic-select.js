import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGlobal } from "../../context/global-states.provider";

export default function BasicSelect() {
  const [feature, setFeature] = React.useState("");
  const { selectFeature } = useGlobal();
  const handleChange = (event) => {
    const selected = event.target.value.replaceAll(" ", "_");
    selectFeature(selected);
    setFeature(event.target.value);
  };
  const features = [
    "Performance",
    "Audio and Technology",
    "Safety and Security",
    "Luxury and Convenience",
    "Authorized Retailer",
    "Warranty",
    "Mainataince",
    "Accessories",
    "Join the converstion",
    "Pricing",
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Call-out</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={feature}
          label="Call-out"
          onChange={handleChange}
        >
          {features.map((feature) => {
            return <MenuItem value={feature}>{feature}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
