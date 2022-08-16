import { Toolbar } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useApi } from "../context/api-provider";
import { useBreakePoint } from "../context/breake-points";
import SearchTable from "./components/search-table";
import "./monrony.css";
const Search = () => {
  const ref = useRef(false);
  const { allVechicles, getAllVechicles } = useApi();
  const { breakPoint, breakepointObserver } = useBreakePoint();
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      getAllVechicles();
      breakepointObserver();
    }
    console.log(breakPoint);
  }, [breakPoint]);
  return (
    <div>
      <div className="search-tabel p-4">
        <Toolbar />
        <SearchTable rows={[...allVechicles]} />
      </div>
    </div>
  );
};

export default Search;
