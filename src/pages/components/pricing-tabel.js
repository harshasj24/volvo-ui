import {
  IconButton,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState, useEffect } from "react";
import "./pricingtabel.css";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


const PricingTabel = ({ feature, price }) => {
  const [edit, setEdit] = useState(false);
  const handelClick = (datafrom) => {
     
     datafrom.edit = !datafrom.edit
      setEdit(!edit);
   
  };
  // const rows = Object.keys(pricingDetails);
  useEffect(() => {
    feature.forEach(element => {
      element.edit = false
    });
  }, [feature]);


  return (
    <>
      {feature && feature.length > 0 &&
      feature.map((el) => {
        return (
      <TableRow sx={{ padding: 0, backgroundColor: el.edit && "#f3f2f1" }}>
        <TableCell sx={{ width: "50%", padding: 0.5 }}>
          {el.edit ? (
            <TextField
              fullWidth
              sx={{ backgroundColor: "white" }}
              size="small"
              multiline
              variant="outlined"
              defaultValue={el.title}
              label=" "
              InputLabelProps={{ shrink: false }}
            />
          ) : (
            <>{el.title}</>
          
          )}
        </TableCell>
        <TableCell sx={{ width: "30%", padding: 0.5 }}>
          {" "}
          {el.edit ? (
            <TextField
              fullWidth
              type='number'
              sx={{ backgroundColor: "white" }}
              size="small"
              multiline
              variant="outlined"
              defaultValue={el.price}
              label=" "
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          ) : (
            <>${el.price}</>
          )}
        </TableCell>
        <TableCell sx={{ width: "20%", padding: 0.5 }}>
          <div className="actions">
            <IconButton
              onClick={() => handelClick(el)}
              color={el.edit ? "primary" : "secondary"}
            >
              <BorderColorOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton className="ms-3">
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
       );
      })
      }
    
    </>
  );
};

export default PricingTabel;
