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
import React, { useState } from "react";
import "./pricingtabel.css";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useGlobal } from "../../context/global-states.provider";
const PricingTabel = ({ itemDescription, price }) => {
  const [edit, setEdit] = useState(false);
  const { replaceChar, titleCase } = useGlobal();
  const handelClick = () => {
    setEdit(!edit);
  };
  // const rows = Object.keys(pricingDetails);
  return (
    <>
      {/*  <div className="w-100"> */}
      {/* <div className="tabel"> */}
      {/* <Table
          sx={{
            minWidth: "60vw",

            border: "none",
            outline: "none",
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#c3d2d6" }}>
              <TableCell className="tabel__cell">Item description</TableCell>
              <TableCell className="tabel__cell">Price</TableCell>
              <TableCell className="tabel__cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody> */}
      {/* {rows.map((row) => {
          return ( */}
      <TableRow sx={{ padding: 0 }}>
        <TableCell sx={{ width: "65%", padding: 0.5 }}>
          {edit ? (
            <input
              defaultValue={replaceChar(itemDescription, "_", " ")}
              className="form-control"
              type="text"
            />
          ) : (
            replaceChar(itemDescription, "_", " ")
          )}
        </TableCell>
        <TableCell sx={{ width: "15%", padding: 0.5 }}>
          {" "}
          {edit ? (
            <input defaultValue={price} className="form-control" type="text" />
          ) : (
            price
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
      {/* );
        })} */}
      {/* </TableBody>
        </Table> */}
    </>
  );
};

export default PricingTabel;
