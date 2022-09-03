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
import {  useParams } from "react-router-dom";

const EditFeature = ({ handelClose, refresh }) => {
  const { feature, reset, createPice, editPrice, editFeature, getALLMonroneyFeature } = useApi();
  const [details, setDetails] = useState("");
  const { selectedFeature, titleCase, getDetails } = useGlobal();
  const [select, setSelect] = useState(false);
  const [description, setDescription] = useState("");
  const [priceValue, setPrice] = useState("");
  const { vin } = useParams();
  // const formik = useFormik({
  //   initialValues: {
  //     details: details,
  //   },
  //   enableReinitialize: true,

  //   onSubmit: (values) => {},
  // });
  const handleclick = (close) => (e) => {
    e.preventDefault();
    if (close) {
    }
    setDetails("");
    handelClose();
    reset();
    // resetSelcted();
    setSelect(true);
    // setTimeout(() => {
    //   setSelect(false);
    // });
    getALLMonroneyFeature(vin);
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
    console.log(feature);
    const updatedFeatures = { ...feature?.features };
    const updatedDetails = details.split("\n");
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
    const updatedFeature = { ...feature, features: updatedFeatures };

    console.log(updatedFeature);
    editFeature(updatedFeature);
    console.log("submited");
  };
  const addNewPrice = async (_) => {
    let dataToSend = {
      title: description,
      price: priceValue,
      pricing_id: 1,
    };

    let response = await createPice(dataToSend);

    console.log("response", response);

    // if (response.status === 200) {
    //   setPrice("");
    //   setDescription("");
    //   refresh()
    // }
  };
  let dataToUpdate;
  const dataAfterChange = (data, el, des) => {
    data.title = des;
    data.price = el;
    dataToUpdate = {
      ...data,
    };
    // console.log(dataToUpdate);
  };
  const updatePrice = async (e) => {
    e.preventDefault();

    console.log(dataToUpdate, "isnde");
    let response = await editPrice(dataToUpdate);

    console.log("response", response);

    if(response.status === 200){
      handelClose();
      getALLMonroneyFeature(vin);
    }

  };

  useEffect(() => {
    setDetails("  ");
    getDetails(feature, setDetails);
    console.log(feature);
  }, [feature, refresh]);

  return (
    <Card className="edit-card" sx={{ minWidth: "40%" }}>
      <form action="">
        <CardHeader
          title={"Content update"}
          subheader={"lorem epsum dolor sit emit"}
        />
        <hr style={{ margin: 0 }} />
        <CardContent>
          <div className="title">
            <Typography variant="h6">{titleCase(selectedFeature)}</Typography>
          </div>

          {selectedFeature === "Pricing" ? (
            <div className="pricing-field w-100 ">
              <div className="pricing-field__tabel">
                <TableContainer className="scroll" sx={{ height: "100%" }}>
                  <Table
                    stickyHeader
                    sx={{
                      minWidth: "60vw",
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
                    sx={{ width: "62%" }}
                    size="small"
                    onChange={(e) => setDescription(e.target.value)}
                    label={"Item Description"}
                  />
                  <TextField
                    className="w-25 mx-2"
                    variant="outlined"
                    size="small"
                    label={"Price"}
                    onChange={(e) => setPrice(e.target.value)}
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
                value={details.trim()}
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
  );
};

export default EditFeature;
