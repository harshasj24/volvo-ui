import * as React from "react";
import PropTypes from "prop-types";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { useNavigate } from "react-router-dom";
import UseLocalStorage from "../../hooks/local-storage";
import { useGlobal } from "../../context/global-states.provider";
import { useApi } from "../../context/api-provider";
import "./grid.css";
const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    {/* <GridToolbarFilterButton ref={setFilterButtonEl} /> */}
    <GridToolbarQuickFilter autoComplete="off" />
  </GridToolbarContainer>
);

CustomToolbar.propTypes = {
  setFilterButtonEl: PropTypes.func.isRequired,
};

const VehicleDataGrid = ({ rows }) => {
  const { carId, setCarId } = useGlobal();
  const { setLoaded } = useApi();
  const navigate = useNavigate();
  const columns = [
    {
      field: "car_year",
      headerName: "Year",
    },
    {
      field: "vehicle_name",
      headerName: "Vehicle",
      width: 150,
    },
    {
      field: "vin",
      headerName: "VIN",
      width: 200,
    },
    {
      field: "location",
      headerName: "Location",
      width: 220,
    },
    {
      field: "car_status",
      headerName: "Status",
    },
    {
      field: "monroney",
      headerName: "Monroney",
    },
    {
      field: "timestamp",
      headerName: "Time Stamp",
      width: 200,
    },
  ];
  const handelClick = (e) => {
    navigate(`/edit/${e.row.vin}`);
    console.log(e.row.car_id);
    setCarId(e.row.car_id);
    setLoaded(false);
  };
  const [filterButtonEl, setFilterButtonEl] = React.useState(null);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        onRowClick={handelClick}
        hideFooter={true}
        autoHeight
        rows={rows}
        getRowId={(row) => row.car_id}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
            showQuickFilter: true,
          },
        }}
      />
    </div>
  );
};

export default VehicleDataGrid;
