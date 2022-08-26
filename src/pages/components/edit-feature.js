import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  InputLabel,
  FormControlLabel,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import BasicSelect from "../../shared/select/basic-select";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobal } from "../../context/global-states.provider";
import "./editfeature.css";
import PricingTabel from "./pricing-tabel";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useApi } from "../../context/api-provider";
import { useFormik } from "formik";
const EditFeature = ({ handelClose }) => {
  const { pricing } = useApi();

  const { selectedFeature, featureDetails, resetSelcted, titleCase, refresh } =
    useGlobal();
  const [select, setSelect] = useState(false);
  const formik = useFormik({
    initialValues: {
      details: featureDetails,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
    onReset: () => {
      console.log("rested");
    },
  });
  const handleclick = (close) => () => {
    close && handelClose();
    resetSelcted();
    setSelect(true);
    setTimeout(() => {
      setSelect(false);
    });
  };

  useEffect(() => {}, [featureDetails]);
  return (
    <Card className="edit-card" sx={{ minWidth: "40%" }}>
      <form
        onReset={formik.handleReset}
        action=""
        onSubmit={formik.handleSubmit}
      >
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

          {selectedFeature === "pricing" ? (
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
                <Table
                  sx={{
                    minWidth: "60vw",

                    border: "none",
                    outline: "none",
                  }}
                >
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#c3d2d6" }}>
                      <TableCell className="tabel__cell">
                        Item description
                      </TableCell>
                      <TableCell className="tabel__cell">Price</TableCell>
                      <TableCell className="tabel__cell">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pricing["special_items"] &&
                      pricing["special_items"].map((key) => {
                        return (
                          <PricingTabel
                            // itemDescription={key}
                            price={key}
                          />
                        );
                      })}
                  </TableBody>
                </Table>
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
                    label={"Item Discription"}
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
                onChange={formik.handleChange}
                className="mt-3 w-100 feature-details"
                value={formik.values.details}
                multiline
                name="details"
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
        <CardActions className="pb-4">
          <Button type="reset" variant="outlined" size="small" color="primary">
            refresh
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="ms-auto"
            onClick={handleclick(true)}
            color="primary"
          >
            Cancle
          </Button>
          <Button
            type="submit"
            variant="contained"
            className=""
            size="small"
            color="primary"
          >
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default EditFeature;
