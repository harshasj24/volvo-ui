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
const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
    <GridToolbarQuickFilter sx={{ marginLeft: "auto" }} />
  </GridToolbarContainer>
);

CustomToolbar.propTypes = {
  setFilterButtonEl: PropTypes.func.isRequired,
};

const VehicleDataGrid = ({ rows }) => {
  const navigate = useNavigate();
  const columns = [
    {
      field: "year",
      headerName: "Year",
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      width: 150,
    },
    {
      field: "VIN",
      headerName: "VIN",
      width: 180,
    },
    {
      field: "location",
      headerName: "Location",
      width: 140,
    },
    {
      field: "monroney",
      headerName: "Monroney",
    },
  ];
  const handelClick = (e) => {
    navigate(`/edit/${e.row.VIN}`);
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
