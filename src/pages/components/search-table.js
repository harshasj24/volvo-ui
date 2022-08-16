import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.css";
const SearchTable = ({ rows }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ border: "none" }}>
          <TableRow>
            <TableCell className="border-none">Year</TableCell>
            <TableCell className="border-none" align="left">
              Vehical
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
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
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
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
