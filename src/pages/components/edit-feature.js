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
const EditFeature = ({ handelClose }) => {
  const { feature, reset } = useApi();
  const [details, setDetails] = useState("");
  const {
    selectedFeature,
    titleCase,
    getDetails,
  } = useGlobal();
  const [select, setSelect] = useState(false);
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
    setDetails(" ");
    handelClose();
    reset();
    // resetSelcted();
    setSelect(true);
    // setTimeout(() => {
    //   setSelect(false);
    // });
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
    // console.log(values);
    const updatedFeatures = { ...feature?.features };
    const updatedDetails = details.split("\n");
    const keys = Object.keys(updatedFeatures);
    let moreDetails = "";
    updatedDetails.map((detail, index) => {
      if (index < keys.length) {
        updatedFeatures[keys[index]] = detail;
      } else {
        moreDetails += detail + "\n";
        updatedFeatures[keys[keys.length - 1]] += moreDetails;
      }
    });
    // Object.keys(updatedFeatures).map((feature, index) => {
    //   updatedFeatures[feature] = updatedDetails[index];
    // });
    console.log(updatedFeatures);
    console.log("submited");
  };

  useEffect(() => {
    setDetails("  ");
    getDetails(feature, setDetails);
    // console.log(feature);
  }, [feature]);

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
            {/* <BasicSelect select={select} className="" /> */}
            <Typography variant="h6">{titleCase(selectedFeature)}</Typography>
          </div>

          {selectedFeature === "Pricing" ? (
            <div className="pricing-field w-100 ">
              {/* {Object.keys(featureDetails).map((key) => {
              return (
                <TextField
                  key={key}
                  className="m-2"
                  defaultValue={featureDetails[key]}
                  label={key.replaceAll("_", " ")}
                />
              );
            })} */}
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
                      <PricingTabel feature={feature?.features?.specialItems} />
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
                    label={"Item Description"}
                  />
                  <TextField
                    className="w-25 mx-2"
                    variant="outlined"
                    size="small"
                    label={"Price"}
                  />
                  <Button
                    sx={{ padding: 0.6 }}
                    variant="outlined"
                    size="medium"
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
            onClick={handleSubmit}
          >
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default EditFeature;
