import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import "./pricingtabel.css";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useGlobal } from "../../context/global-states.provider";
const PricingTabel = ({ pricingDetails }) => {
  const [edit, setEdit] = useState(false);
  const { replaceChar } = useGlobal();
  const rows = Object.keys(pricingDetails);
  return (
    <div className=" w-100">
      <div className="tabel">
        <Table
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
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow sx={{ padding: 0 }}>
                  <TableCell sx={{ width: "65%", padding: 0.5 }}>
                    {replaceChar(row, "_", " ")}
                  </TableCell>
                  <TableCell sx={{ width: "15%", padding: 0.5 }}>
                    {pricingDetails[row]}
                  </TableCell>
                  <TableCell sx={{ width: "20%", padding: 0.5 }}>
                    <div className="actions">
                      <IconButton>
                        <BorderColorOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton className="">
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PricingTabel;
