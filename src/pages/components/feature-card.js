import React, { useEffect, useRef, useState } from "react";
// import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { Table, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import "./features.css";
import { useGlobal } from "../../context/global-states.provider";
import LongMenu from "./long-menu";
import { useApi } from "../../context/api-provider";
import { Block } from "@mui/icons-material";
const FeatureCard = ({ title, handelOpen, feature }) => {
  const { getDetails } = useGlobal();
  const { getVechicleFeature, role } = useApi();
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
      ref.current = false;
      console.log("executed");
    }
    getDetails(feature, setDetails);
  }, [feature]);

  return (
    <div class="feature-card__wrapper">
      <div className="feature-card__header  d-flex align-items-center">
        {feature.title}
        {role.role === "ADMIN" && (
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
        )}
      </div>
      {feature.title !== "Pricing" ? (
        <div className="feature-card__body">{details}</div>
      ) : (
        <div className="feature-card__body">
        <ul>
          <li class="pricing-card__body">
            <div>
            <span class="pricing-card__body--description">{feature.features.list_price_text_description}</span>
            <br></br>
            <span style= {{ 'padding-left': '0.5rem', 'display': 'block' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
          </div>
            <div class="pricing-card__body--price">${feature.features.list_price}</div>
          </li>
          {feature.features.specialItems &&
          feature.features.specialItems.map((el) => {
            return (
            <li class="pricing-card__body" style={{'margin': '1rem 0' }}>
            <div class="pricing-card__body--description">{el.title}</div>
            <div class="pricing-card__body--price">${el.price}</div>
          </li>
            );
          })}
          <hr></hr>
          <li class="pricing-card__body">
            <div class="pricing-card__body--description">
              Total
            </div>
            <div class="pricing-card__body--price">${Math.round(feature.total * 100) / 100}</div>
          </li>
        </ul>
        </div>
        // <React.Fragment>
        //   <Table
        //     size="small"
        //     sx={{
        //       [`& .${tableCellClasses.root}`]: {
        //         borderBottom: "none",
        //       },
        //     }}
        //   >
        //     <TableRow>
        //       <TableCell>
        //         <b>{feature.features.list_price_text_description}</b>
        //       </TableCell>
        //       <TableCell>
        //         <b>${feature.features.list_price}</b>
        //       </TableCell>
        //     </TableRow>
        //     <TableRow>
        //       <TableCell>
        //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        //         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        //         enim ad minim veniam, quis nostrud exercitation ullamco laboris
        //         nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        //         in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        //         nulla pariatur. Excepteur sint occaecat cupidatat non proident,
        //         sunt in culpa qui officia deserunt mollit anim id est laborum.
        //       </TableCell>
        //     </TableRow>

        //     {feature.features.specialItems &&
        //       feature.features.specialItems.map((el) => {
        //         return (
        //           <TableRow>
        //             <TableCell>{el.title}</TableCell>
        //             <TableCell>
        //               <b>${el.price}</b>
        //             </TableCell>
        //           </TableRow>
        //         );
        //       })}
        //     <hr></hr>

        //     <TableRow>
        //       <TableCell>
        //         <b>Total</b>
        //       </TableCell>
        //       <TableCell>
        //         <b>${Math.round(feature.total * 100) / 100}</b>
        //       </TableCell>
        //     </TableRow>
        //   </Table>
        // </React.Fragment>
      )}
    </div>
  );
};

export default FeatureCard;
