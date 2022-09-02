import { Typography } from "@mui/material";
import React from "react";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import "./govtinfo.css";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";
import { useParams } from "react-router-dom";
import green from "../../assets/rating green.svg";
import smog from "../../assets/rating smog.svg";
import bunchLogo from "../../assets/bunch-logo.JPG";
import { useApi } from "../../context/api-provider";
export const GovtInfo = () => {
  const { vin } = useParams();
  const { monronyGovtMandet } = useApi();
  // fuel_economy
  // gov_ratings
  // importation
  // parts_content_information
  // vehicle_identification
  const getFuelEconomy = (key) => {
    try {
      return monronyGovtMandet?.fuel_economy[key];
    } catch (error) {
      return "";
    }
  };
  const getGovtRating = (key) => {
    return monronyGovtMandet?.gov_ratings[key];
  };
  const getVechicleInfo = (key) => {
    try {
      return monronyGovtMandet?.vehicle_identification[key];
    } catch (error) {
      return "";
    }
  };
  const getImportion = (key) => {
    try {
      return monronyGovtMandet?.importation[key];
    } catch (error) {
      return "";
    }
  };
  const getPartsContentInfo = (key) => {
    try {
      return monronyGovtMandet?.parts_content_information[key];
    } catch (error) {
      return "";
    }
  };
  return (
    <>
      <div className="govt-info__fuel-economy">
        <div className="header__title d-flex">
          <div className="epa-dot ms-1">
            <p>EPA</p>
            <hr />
            <p>DOT</p>
          </div>
          <Typography className="ms-4" variant="p">
            Fuel Economy And Environment
          </Typography>
          <div className="header__vechicle-type d-flex align-items-center ms-auto bg-light text-dark">
            <LocalGasStationIcon />
            <Typography className="ms-3" fontSize={".7rem"}>
              {getFuelEconomy("energy_type")} vechicle
            </Typography>
          </div>
        </div>
        <div className="fuel-ecnomy-section  mt-2 bg-light text-dark d-flex">
          <div className="economy-info position-relative ">
            <div className="mpg d-flex">
              <div className="fuel-logo">
                <LocalGasStationIcon fontSize="inherit" />
              </div>
              <div className="mpg-val d-flex flex-column">
                <p className="fs-sm m-0">Fuel Economy</p>
                <h1 className="m-0 p-0" style={{ fontSize: "3.5rem" }}>
                  {getFuelEconomy("mpg_combined")}
                </h1>
                <p className="fs-sm  combine p-0">combine city/hwy</p>
              </div>

              <div className="units ms-2 mt-1">
                <p>MPG</p>
                <div className="seperate d-flex">
                  <div className="city d-flex flex-column align-items-center">
                    <p>{getFuelEconomy("mpg_city")}</p>
                    <p className="font-sm">City</p>
                  </div>
                  <div className="high-way ms-1 d-flex flex-column align-items-center">
                    <p>{getFuelEconomy("mpg_highway")}</p>
                    <p className="font-sm">Highway</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="gallons ms-3">
              <strong>{getFuelEconomy("gallons_per_100_miles")}</strong>
              <span className="fs-sm"> gallons per 100 miles</span>
            </div>
          </div>
          <div className="mpg-text mt-3">
            <p className="fs-sm p-1">
              small SUV 2WD range from 16 to 125 MPG. The best vechicle rates
              142 MPGe
            </p>
          </div>
          <div className="spend ms-auto">
            <span className="line-h-lg">
              you <span className="fs-md-lg">Spend</span> <br />
              <span className="fs-lg">{getFuelEconomy("spend_in_gas")}</span>
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
          <div className="annual-cost__display bg-light text-dark p-2 br-3s ">
            <p className="fs-md">
              Annual Fuel <span className="fs-md-lg">Cost</span>
            </p>
            <p className="fs-lg mt-4">$1,700</p>
          </div>
          <div className="anual-cost__rating bg-light text-dark  br-3s ">
            {/* <div className="ratings d-flex gap-2">
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
            </div> */}
            <div className="inner-third-content2">
              <div className="inner-third-flex1">
                <div className="green">
                  <p>
                    Fuel Economy & Greenhouse Gas Rating{" "}
                    <span>(tailpipe only)</span>
                  </p>
                  <div className="scale">
                    <img width={"100%"} src={green} alt="" />
                  </div>
                </div>
                <div className="smog ms-1">
                  <p>
                    Smog Rating <span>(tailpipe only)</span>{" "}
                  </p>
                  <div className="scale">
                    <img width={"100%"} src={smog} alt="" />
                  </div>
                </div>
              </div>
              <div className="inner-third-flex2">
                <p>
                  This vehicle emits 345 grams CO2 per mile. The best emits 0
                  grams per mile (tailpipe only). Producing and distributing
                  fuel also create emissions; learn more at fueleconomy.gov.
                </p>
              </div>
            </div>
            {/* <span className="fs-md">
              Lorem ipsum dolor sit amet cddfdfdfdfdf
            </span> */}
          </div>
        </div>
        <div className="logos-qr-section d-flex mt-2">
          <div className="content">
            <p className="fs-sm margin-0">
              Actual results will vary for many reasons, including driving
              conditions and how you drive and maintain your vehicle. The
              average new vehicle gets 27 MPG and costs $ 6,500 to fuel over 5
              years. Cost estimates are based on 15000 miles per year at $2.95
              per gallon. MPGe is miles per gasoline gallon equivalent. Vehicle
              emissions are a significant cause of climate change and smog
            </p>
            <div className="logos d-flex">
              <div className="logo-content ">
                <p className="fs-md-lg mt-2">fueleconomy.gov</p>
                <p className="fs-sm margin-0 mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                </p>
              </div>
              <div className="logo-images d-flex gap-1 ms-3 p-2">
                {/* <div className="gov-logo"></div>
                <div className="gov-logo"></div>
                <div className="gov-logo"></div> */}
                <img width={"100%"} src={bunchLogo} alt="" />
              </div>
            </div>
          </div>
          <div className="qr-code d-flex align-items-center justify-content-center bg-light">
            <p className="text-dark qr w-100 border  text-center">QR Code</p>
            <div
              style={{
                height: "auto",
                margin: "0px",
                maxWidth: 54,
                width: "100%",
                flexShrink: 0,
              }}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={window.location.href}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lower-content">
        <div className="left-container ">
          <h5>PARTS CONTENT INFORMATION</h5>
          <div className="inner-left-container">
            <ul>
              <li>FOR VEHICLES IN THIS CARLINE: VOLVO SERIES</li>
              <li>
                U.S./CANADIAN PARTS CONTENT:{" "}
                {getPartsContentInfo("us_canadian_content")}
              </li>
              <li>
                MAJOR SOURCES OF FOREIGN PARTS CONTENT:{" "}
                {getPartsContentInfo("major_source_foreign_parts1_name")}:
                {getPartsContentInfo("major_source_foreign_parts1_amount")}
              </li>
              <li>
                FOR THIS VEHICLE: FINAL ASSEMBLY POINT:{" "}
                {getPartsContentInfo("final_assembly_point")}
              </li>
              <li>
                COUNTRY OF ORIGIN: ENGINE PARTS:
                {getPartsContentInfo("country_of_origin")}
              </li>
              <li>
                TRANSMISSION PARTS:
                {getPartsContentInfo("transmission_parts_origin")}
              </li>
            </ul>
            <p>
              Note: Parts contents does not include final assembly,
              distribution, or other non-parts costs.
            </p>
          </div>
        </div>

        <div className="right-container">
          <div className="first-inner-container">
            <h5>GOVERNMENT 5-STAR SAFETY RATINGS</h5>
            <div className="first-right-content">
              <p>
                This vehicle has not been rated by the government for overall
                vehicle score, frontal crash or rollover risk.
              </p>
            </div>
            <p className="last-para">
              Star ratings range from 1 to 5 stars ( ) with 5 being the highest.
              Source: National Highway Traffic Safety Administration (NHTSA)
              www.safercar.gov or 1-888-327-4236
            </p>
          </div>
          <div className="second-inner-container">
            <div className="left-second-content">
              <p>VEHICLE IDENTIFICATION</p>
              <p>Type & Chassis: 246 952643</p>
              <p>Model Year: {getVechicleInfo("model_year")}</p>
              <p>Color:{getVechicleInfo("color")}</p>
              <p>VIN: {getVechicleInfo("vin")}</p>
            </div>
            <div className="left-second-content">
              <p>Port of Importation: {getImportion("port_of_importation")}</p>
              <p>Delivered by: {getImportion("delivered_by")}</p>
              <p>DELIVERY ADDRESS</p>
              {/* <p>VOLVO CARS ATHENS 7149</p>
              <p>2890 ATLANTA HIGHWAY</p>
              <p>ATHENS, GA 30606</p> */}
              <p>{getImportion("delivery_address").toUpperCase()}</p>
            </div>
          </div>
          <div className="third-inner-container d-flex">
            {/* <div className="mx-auto"> */}
            {/* <img src="barCode.png" /> */}
            <Barcode
              height="30px"
              fontSize={15}
              width={1.2}
              format="CODE128"
              value={vin}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
