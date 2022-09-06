import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useGlobal } from "../../context/global-states.provider";
import "./editfeature.css";
import PricingTabel from "./pricing-tabel";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useApi } from "../../context/api-provider";
import { useParams } from "react-router-dom";
import Loader from "../../shared/loader";

const EditFeature = ({ handelClose, refresh }) => {
  const {
    feature,
    reset,
    createPice,
    editPrice,
    editFeature,
    getALLMonroneyFeature,
    getVechicleFeature,
    vinLoad
  } = useApi();
  const [details, setDetails] = useState("");
  const { selectedFeature, titleCase, getDetails } = useGlobal();
  const [select, setSelect] = useState(false);
  const [description, setDescription] = useState("");
  const [priceValue, setPrice] = useState("");
  const [addPrice, setAddPrice] = useState(false);
  const { vin } = useParams();

  const handleclick = (close) => (e) => {
    e.preventDefault();
    if (close) {
    }
    setDetails("");
    // resetSelcted();
    setSelect(true);
    // setTimeout(() => {
    //   setSelect(false);
    // });
    getALLMonroneyFeature(vin);
    reset();
    handelClose();
  };
  const handelRest = (e) => {
    e.preventDefault();
    getDetails(feature, setDetails);
  };

  const handleChange = (e) => {
    setDetails(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFeatures = { ...feature?.features };
    const updatedDetails = details.trim().split("\n");
    const keys = Object.keys(updatedFeatures);
    let moreDetails = "";
    updatedDetails.map((detail, index) => {
      if (index < keys.length) {
        updatedFeatures[keys[index]] = detail;
      } else {
        // moreDetails += detail + "\n";
        updatedFeatures[keys[keys.length - 1]] += "\n" + detail;
      }
    });
    // Object.keys(updatedFeatures).map((feature, index) => {
    //   updatedFeatures[feature] = updatedDetails[index];
    // });
    let updatedFeature = {};
    if (feature.title === "Authorized Retailer") {
      updatedFeature = { ...feature, address: details };
    } else {
      updatedFeature = { ...feature, features: updatedFeatures };
    }
    reset();
    editFeature(updatedFeature);
    handelClose();
    setDetails("");
  };
  const addNewPrice = async (_) => {
    let dataToSend = {
      title: description,
      price: priceValue,
      pricing_id: 1,
    };

    let response = await createPice(dataToSend);

    if (response.status === 200) {
      setPrice("");
      setDescription("");
      getVechicleFeature("pricing");
      setAddPrice(true);
    }
  };
  let dataToUpdate;
  const dataAfterChange = (data, el, des) => {
    data.title = des;
    data.price = el;
    dataToUpdate = {
      ...data,
    };
  };
  const updatePrice = async (e) => {
    e.preventDefault();
    if (dataToUpdate) {
      let response = await editPrice(dataToUpdate);

    }
      handelClose();
      getALLMonroneyFeature(vin);
    
  };

  useEffect(() => {
    setDetails("  ");
    getDetails(feature, setDetails);
  }, [feature, refresh, addPrice]);

  return (
    <>
    <Card className="edit-card" sx={{ minWidth: "40%" }}>
      <form action="">
        <CardHeader
          title={titleCase(selectedFeature) + " Edit"}
          subheader={
            "Please edit " +
            titleCase(selectedFeature) +
            " information and update the monroney label"
          }
        />
        <hr style={{ margin: 0 }} />
        <CardContent>
          <div className="title"></div>

          {selectedFeature === "Pricing" ? (
            <div className="pricing-field w-100 ">
              <div className="pricing-field__tabel">
                <TableContainer className="scroll" sx={{ height: "100%" }}>
                  <Table
                    stickyHeader
                    sx={{
                      minWidth: "40vw",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell className="tabel__cell">
                          Item description
                        </TableCell>
                        <TableCell className="tabel__cell">Price</TableCell>
                        <TableCell className="tabel__cell">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <PricingTabel
                        feature={feature?.features?.specialItems}
                        dataAfterChange={dataAfterChange}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              <div className="add  w-100  mt-3">
                <Typography variant="p" fontWeight={"bold"}>
                  Add Item
                </Typography>

                <div className="actions mt-3">
                  <TextField
                    variant="outlined"
                    sx={{ width: "50%" }}
                    size="small"
                    onChange={(e) => setDescription(e.target.value)}
                    label={"Item Description"}
                    value={description}
                  />
                  <TextField
                    className="w-25 mx-2"
                    variant="outlined"
                    size="small"
                    label={"Price"}
                    onChange={(e) => setPrice(e.target.value)}
                    value={priceValue}
                  />
                  <Button
                    sx={{ padding: 0.6 }}
                    variant="outlined"
                    size="medium"
                    onClick={addNewPrice}
                    disabled={!priceValue && !description}
                  >
                    <AddOutlinedIcon fontSize="1" className="m-0" />{" "}
                    <span className="ms-2">Add</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <TextField
                variant="outlined"
                onChange={handleChange}
                className="mt-3 w-100 feature-details"
                value={details}
                multiline
                minRows={6}
                maxRows={10}
                label="Details"
                InputLabelProps={{ shrink: true }}
                sx={{
                  border: "none",
                  outline: "none",
                }}
              />
            </div>
          )}
        </CardContent>
        <hr />
        <CardActions className="pb-4 px-3">
          <Button
            type="buton"
            onClick={handelRest}
            variant="outlined"
            size="small"
            color="primary"
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            size="small"
            type="button"
            className="ms-auto"
            onClick={handleclick(true)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className=""
            size="small"
            color="primary"
            onClick={selectedFeature === "Pricing" ? updatePrice : handleSubmit}
          >
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
   {vinLoad && <Loader open={vinLoad}/>}
    </>
  );
};

export default EditFeature;
