import { Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
    getAll();
  }, [breakPoint]);
  const [per, setPer] = useState();
  const getAll = async () => {
    const res = await axios.get("http://localhost:3100/features");
    console.log(res.data[0]["performence"]);
    setPer(res.data[0]["performence"]);
  };
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
