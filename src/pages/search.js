import { LinearProgress, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useApi } from "../context/api-provider";
import { useBreakePoint } from "../context/breake-points";
import Spinner from "../shared/spinner";
import SearchTable from "./components/search-table";
import VehicleDataGrid from "./components/Vehicle-data-grid";
import "./monrony.css";
const Search = () => {
  const ref = useRef(false);

  const { allVechicles, getAllVechicles, isLoaded } = useApi();
  const { breakPoint, breakepointObserver } = useBreakePoint();
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      getAllVechicles();
      breakepointObserver();
    }
  }, [breakPoint]);
  const [per, setPer] = useState();

  return (
    <div>
      <Toolbar />
      <LinearProgress hidden={isLoaded} className="progress" />
      <div className="main-body--wrapper">
        <VehicleDataGrid rows={allVechicles} />
      </div>
    </div>
  );
};

export default Search;
