import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./pricingtabel.css";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useGlobal } from "../../context/global-states.provider";
const PricingTabel = ({ feature, price }) => {
  const [edit, setEdit] = useState(false);
  const { replaceChar, titleCase } = useGlobal();
  const handelClick = () => {
    setEdit(!edit);
  };
  // const rows = Object.keys(pricingDetails);
  useEffect(() => {
   
  }, [feature]);


  return (
    <>
      {feature && feature.length > 0 &&
      feature.map((el) => {
        return (
      <TableRow sx={{ padding: 0, backgroundColor: edit && "#f3f2f1" }}>
        <TableCell sx={{ width: "65%", padding: 0.5 }}>
          {edit ? (
            <TextField
              fullWidth
              sx={{ backgroundColor: "white" }}
              size="small"
              multiline
              variant="outlined"
              // defaultValue={price["title"]}
              label=" "
              InputLabelProps={{ shrink: false }}
            />
          ) : (
            <>{el.title}</>
            // <input
            //   multiple
            //   defaultValue={price["title"]}
            //   className="form-control"
            //   type="text"
            // />
            // replaceChar(itemDescription, "_", " ")
            // price["title"]
          )}
        </TableCell>
        <TableCell sx={{ width: "15%", padding: 0.5 }}>
          {" "}
          {edit ? (
            // <input
            //   defaultValue={price["price"]}
            //   className="form-control"
            //   type="text"
            // />
            <TextField
              label=" "
              fullWidth
              sx={{ backgroundColor: "white" }}
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: false,
              }}
              // defaultValue={price["price"]}
            />
          ) : (
            <>${el.price}</>
            // price["price"]
          )}
        </TableCell>
        <TableCell sx={{ width: "20%", padding: 0.5 }}>
          <div className="actions">
            <IconButton
              onClick={handelClick}
              color={edit ? "primary" : "default"}
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
