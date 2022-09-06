import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGlobal } from "../../context/global-states.provider";
import { useApi } from "../../context/api-provider";
import { useParams } from "react-router-dom";

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
  const [feature, setFeature] = useState("");
  const { selectFeature, selectedFeature } = useGlobal();
  const {  editImportation, editAuthorizedretailer, getALLMonroneyFeature } = useApi();

  const { vin } = useParams();
  const handleChange = (event) => {
    const selected = event.target.value;
    selectFeature(selected);
    setFeature(event.target.value);
  
    setFieldValue && setFieldValue(name, event.target.value);
   let NewAddress = JSON.parse(localStorage.getItem('selectedDropdown'));

    if(event.target.value === "Allocated"){
      //call API
      let dataImport = {
        importation :{
          ...NewAddress,
          title:'importation'
        }
      }

      let dataForAuth = {
        authorized_retailer: {
          "authorized_retailer_id": NewAddress.importation_id,
          "address": NewAddress.delivery_address,
          "dealer_code": NewAddress.importation_id,
          "car_id": 1,
          title: "Authorized Retailer"
        }
          
      }
    importation(dataImport);
       auth(dataForAuth);
      
    }
    else{
      //no idea
    }

 
  };
  
    const importation = async(dataImport) =>{
      const response = await editImportation(dataImport);
      console.log(response,  'response');
    }

    const auth = async(dataForAuth) =>{
      const response = await editAuthorizedretailer(dataForAuth);
    
      if(response){
        getALLMonroneyFeature(vin);
      }
     
    }

  useEffect(() => {
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
