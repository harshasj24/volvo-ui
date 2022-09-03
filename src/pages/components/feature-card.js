import React, { useEffect, useRef, useState } from "react";
// import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { Table, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import "./features.css";
import { useGlobal } from "../../context/global-states.provider";
import LongMenu from "./long-menu";
import { useApi } from "../../context/api-provider";
const FeatureCard = ({ title, handelOpen, feature }) => {
  const { getDetails } = useGlobal();
  const { getVechicleFeature } = useApi();
  const [details, setDetails] = useState("");

  const { getMonroneyFeature } = useApi();
  const { selectFeature } = useGlobal();
  const handelClick = () => {
    handelOpen();
    selectFeature(feature.title);
    getVechicleFeature(feature.title);

    title === "Pricing" && getMonroneyFeature(title);
  };
  const ref = useRef(true);
  useEffect(() => {
    if (ref.current) {
      getDetails(feature, setDetails);
      ref.current = false;
    }
  }, [feature, details]);

  return (
    <div>
      <div className="feature-card__header  d-flex align-items-center">
        {feature.title}
        <div className="header-icon ms-auto">
          {
            <LongMenu openModel={handelClick} /> /* {active(
              // <IconButton>
              <AssistantPhotoIcon onClick={handelClick} />,
              // </IconButton>,
              <BorderColorOutlinedIcon color="primary" />
            )} */
          }
        </div>
      </div>
      {feature.title !== "Pricing" ? (
        <div className="feature-card__body">{details}</div>
      ) : (
        <React.Fragment>
          <Table
            size="small"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
            }}
          >
            <TableRow>
              <TableCell>
                <b>{feature.features.list_price_text_description}</b>
              </TableCell>
              <TableCell>
                <b>${feature.features.list_price}</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </TableCell>
            </TableRow>

            {feature.features.specialItems &&
              feature.features.specialItems.map((el) => {
                return (
                  <TableRow>
                    <TableCell>{el.title}</TableCell>
                    <TableCell>
                      <b>${el.price}</b>
                    </TableCell>
                  </TableRow>
                );
              })}
               <hr></hr>
               
               <TableRow>
              <TableCell>
                <b>Total</b>
              </TableCell>
              <TableCell>
              <b>${Math.round(feature.total * 100)/100}</b>
              </TableCell>
            </TableRow>
          </Table>
         
        
        </React.Fragment>
      )}
    </div>
  );
};

export default FeatureCard;
