import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
const Dealer = () => {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 250 }}
      size="small"
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option}
      //   renderOption={(props, option) => (
      //     <Box
      //       component="li"
      //       sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
      //       {...props}
      //     >
      //       <img
      //         loading="lazy"
      //         width="20"
      //         src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
      //         srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
      //         alt=""
      //       />
      //       {option.label} ({option.code}) +{option.phone}
      //     </Box>
      //   )}
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
  "7139-Volvo cars Andorra",
  "7159-Volvo cars United Arab Emirates",
  "7189-Volvo cars Afghanistan",
  "7119-Volvo cars Antigua and Barbuda",
  "7169-Volvo cars Anguilla",
  "7179-Volvo cars Albania",
  "7249-Volvo cars Armenia",
  "7345-Volvo cars Angola",
  "7235-Volvo cars Antarctica",
  "7890-Volvo cars Argentina",
  "1279-Volvo cars American Samoa",
  "2390-Volvo cars Austria",
  "9987-Volvo cars Australia",
  "1238-Volvo cars Aruba",
  "9065-Volvo cars Alland Islands",
  "7149-Volvo cars Athens",
  "3456-Volvo cars Azerbaijan",
  "8722-Volvo cars Bosnia and Herzegovina",
  "6688-Volvo cars CocosIslands",
  "9873-Volvo cars Congo, Democratic Republic of the",
  "3816-Volvo cars Central African Republic",
  "4444-Volvo cars Congo, Republic of the",
  "0974-Volvo cars Switzerland",
  "6789-Volvo cars Cote d'Ivoire",
  "9652-Volvo cars Cyprus",
  "1123-Volvo cars Czech Republic",
  "4456-Volvo cars Germany",
  "1278-Volvo cars Djibouti",
  "9865-Volvo cars Denmark",
  "8735-Volvo cars Dominica",
  "9751-Volvo cars Algeria",
  "3476-Volvo cars Ecuador",
  "8971-Volvo cars Estonia",
  "8123-Volvo cars Egypt",
  "4567-Volvo cars Western Sahara",
  "1782-Volvo cars Eritrea",
  "9827-Volvo cars Spain",
  "9987-Volvo cars Ethiopia",
  "1236-Volvo cars Finland",
  "5567-Volvo cars Fiji",
  "7765-Volvo cars Gabon",
  "2345-Volvo cars United Kingdom",
  "9862-Volvo cars Grenada",
  "1234-Volvo cars Georgia",
  "4567-Volvo cars French Guiana",
  "7890-Volvo cars Guernsey",
  "0234-Volvo cars Ghana",
  "3444-Volvo cars Gibraltar",
  "5555-Volvo cars Greenland",
  "6677-Volvo cars Gambia",
  "2255-Volvo cars Guinea",
  "5589-Volvo cars Guadeloupe",
  "9987-Volvo cars Equatorial Guinea",
  "7775-Volvo cars Greece",
  "3332-Volvo cars Lebanon",
  "1277-Volvo cars Saint Lucia",
];
export default Dealer;
