import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
const SearchTable = ({ rows }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/edit");
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ border: "none" }}>
          <TableRow>
            <TableCell className="border-none">Year</TableCell>
            <TableCell className="border-none" align="left">
              vehicle
            </TableCell>
            <TableCell className="border-none" align="left">
              VIN
            </TableCell>
            <TableCell className="border-none" align="left">
              Status
            </TableCell>
            <TableCell className="border-none" align="left">
              Location
            </TableCell>
            <TableCell className="border-none" align="left">
              monroney
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ border: "none", outline: "none" }}>
            <TableCell className="tabel-body__cell"></TableCell>
            <TableCell className="tabel-body__cell"></TableCell>
            <TableCell className="tabel-body__cell"></TableCell>
            <TableCell className="tabel-body__cell"></TableCell>
            <TableCell className="tabel-body__cell"></TableCell>
            <TableCell className="tabel-body__cell"></TableCell>
          </TableRow>
          {rows.map((row) => {
            return (
              <TableRow
                onClick={handleClick}
                hover
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell sx={{ width: "100px" }} component="th" scope="row">
                  {row.year}
                </TableCell>
                <TableCell sx={{ width: "15vw" }} align="left">
                  {row.vehicle}
                </TableCell>
                <TableCell sx={{ width: "15vw" }} align="left">
                  {row.VIN}
                </TableCell>
                <TableCell sx={{ width: "12vw" }} align="left">
                  {row.status}
                </TableCell>
                <TableCell sx={{ width: "12vw" }} align="left">
                  {row.location}
                </TableCell>
                <TableCell align="left">{row.monroney}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchTable;
