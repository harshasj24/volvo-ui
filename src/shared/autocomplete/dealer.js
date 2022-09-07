import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useApi } from "../../context/api-provider";
import UseLocalStorage from "../../hooks/local-storage";
import { useGlobal } from "../../context/global-states.provider";

let autoValue = "";
const Dealer = () => {
  const { role } = useApi();
  const { selectFeature, selectedFeature } = useGlobal();
  const [onAutoSelect, setOnAuto] = UseLocalStorage("selectedDropdown", "");

  const onAuto = (event, values) => {
    autoValue = values;
    countries.forEach((el) => {
      if (el.title === values) {
        setOnAuto(el);
      }
    });
  };

  useEffect(() => {
    if (selectedFeature === "Allocated") {
      autoValue = "";
    }
  }, [selectedFeature, selectFeature]);

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 250 }}
      size="small"
      options={countries.map((el) => el.title)}
      disabled={role?.role === "USER"}
      autoHighlight
      onChange={onAuto}
      value={autoValue}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Allocation"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
const countries = [
  {
    importation_id: 1,
    title: "7139-Volvo cars NY",
    port_of_importation: "Binghamton, NY",
    delivered_by: "Truck",
    delivery_address:
      " 7139 VOLVO CARS MANHATTAN 565 11TH AVE, NEW YORK, NY 10036",
    car_id: 1,
  },
  {
    importation_id: 1,
    title: "7149-Volvo DC",
    port_of_importation: "Arlington, Virginia",
    delivered_by: "Bus",
    delivery_address: "7149-Volvo DC, RICK, DC 75209",
    car_id: 1,
  },
  {
    importation_id: 1,
    title: "7159-Volvo Huston",
    port_of_importation: "Stafford, TX",
    delivered_by: "Car",
    delivery_address:
      "7159-Volvo Houston Park City Volvo 3515 Inwood Road sd, Huston 75209",
    car_id: 1,
  },
  {
    importation_id: 1,
    title: "7169-Volvo Virginia",
    port_of_importation: "Richmond, Virginia",
    delivered_by: "Truck",
    delivery_address:
      "7169-Volvo RichMond Park City Volvo 3515 Inwood Road Dallas, Virginia 75209",
    car_id: 1,
  },
];
export default Dealer;
