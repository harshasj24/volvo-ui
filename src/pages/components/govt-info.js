import { Typography } from "@mui/material";
import React from "react";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import "./govtinfo.css";
export const GovtInfo = () => {
  return (
    <div className="govt-info">
      <div className="govt-info__fuel-economy">
        <div className="header__title d-flex">
          <Typography variant="p">Fuel Economy And Environment</Typography>
          <div className="header__vechicle-type d-flex align-items-center ms-auto bg-light text-dark">
            <LocalGasStationIcon />
            <Typography className="ms-3" fontSize={".7rem"}>
              Gasolane vechicle
            </Typography>
          </div>
        </div>
        <div className="fuel-ecnomy-section  mt-2 bg-light text-dark d-flex">
          <div className="economy-info position-relative ">
            <Typography marginLeft={"6%"} fontSize={".6rem"} variant="p">
              Fuel Economy
            </Typography>
            <div className="mpg d-flex">
              <div className="mpg-val">
                <LocalGasStationIcon className="fuel-icon" />
                <Typography variant="p" margin={0} fontSize={"3.8rem"}>
                  26
                </Typography>
              </div>

              <div className="units ms-2">
                <p>MPG</p>
                <div className="seperate d-flex">
                  <div className="city">
                    <p>23</p>
                    <p className="font-sm">City</p>
                  </div>
                  <div className="high-way ms-2">
                    <p>30</p>
                    <p className="font-sm">Highway</p>
                  </div>
                </div>
              </div>
              <Typography
                className="combined"
                marginLeft={"6.5%"}
                fontSize={".6rem"}
                variant="p"
              >
                combined city/hwy
              </Typography>
            </div>
            <div className="gallons ms-3">
              <strong>3.8</strong>
              <span className="fs-sm"> gallons per 100 miles</span>
            </div>
          </div>
          <div className="mpg-text mt-4">
            <p className="fs-sm">
              small SUV 2WD range from <br />
              16 to 125 MPG. The best <br /> vechicle rates 142 MPGe
            </p>
          </div>
          <div className="spend ms-3">
            <span className="line-h-lg">
              you <span className="fs-md-lg">Spend</span> <br />
              <span className="fs-lg">$2,000</span>
            </span>

            <br />
            <span className="fs-md line-h-sm">
              more in fuel cost over 5 years
            </span>
            <br />
            <span className="line-h-sm fs-sm">
              Compared to the average new vehicle
            </span>
          </div>
        </div>

        <div className="annual-cost-section d-flex mt-2 gap-2">
          <div className="annual-cost__display bg-light text-dark p-2 br-3s line-h-lg">
            <p className="fs-md">
              Annual Fuel <span className="fs-md-lg">Cost</span>
            </p>
            <p className="fs-lg">$1,700</p>
          </div>
          <div className="anual-cost__rating bg-light text-dark  br-3s ">
            <div className="ratings d-flex gap-2">
              <div className="green-house-rating ">
                <p className="fs-sm">
                  <strong>Fuel economy and green house gas rating</strong>
                </p>
              </div>
              <div className="smog-rating ">
                <p className="fs-sm">
                  <strong>smog rating</strong>
                </p>
              </div>
            </div>
            <span className="fs-md">
              Lorem ipsum dolor sit amet cddfdfdfdfdf
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
