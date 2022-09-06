import React, { createContext, useContext, useMemo, useState } from "react";
import UseLocalStorage from "../hooks/local-storage";
import { useApi } from "./api-provider";
const globalCotext = createContext();
export const GlobalStaesProvider = ({ children }) => {
  const [carId, setCarId] = UseLocalStorage("carId", null);
  const [store, setStore] = useState({
    selectedFeature: "",
    featureDetails: "",
  });
  // const { feature } = useApi();
  const selectFeature = (selected) => {
    const key = selected.replaceAll(" ", "_").toLowerCase();
    setStore({
      ...store,
      selectedFeature: selected,
      // featureDetails: feature[key],
    });
 
  };

  const setSelect = () => {};

  const resetSelcted = () => {
    // setStore({ ...store, featureDetails: "", selectedFeature: "" });
  };

  const refresh = () => {
 
    // setStore({ ...store, featureDetails: feature[store.selectedFeature] });
  };

  const titleCase = (string) => {
    return string.replace(/\w\S*/g, (char) => {
      return char[0].toUpperCase() + char.slice(1).toLowerCase();
    });
  };
  const replaceChar = (string, toReplace, newChar) => {
    return string.replaceAll(toReplace, newChar);
  };
  const getDetails = (feature, setDetails) => {
    setDetails("");
   
    try {
      if (feature.title === "Authorized Retailer") {
     
        setDetails(feature?.address);
      } else {
        Object.keys(feature?.features).map((key) => {
          setDetails((prev) => {
            return prev + feature?.features[key] + "\n";
          });
        });
      }
    } catch (error) {}
  };
  const [onAutoSelect, setOnAuto] = UseLocalStorage("selectedDropdown", null);
  const values = useMemo(() => {
    return {
      selectedFeature: store.selectedFeature,
      selectFeature,
      featureDetails: store.featureDetails,
      resetSelcted,
      titleCase,
      replaceChar,
      refresh,
      getDetails,
      carId,
      setCarId,
      onAutoSelect,
      setOnAuto
    };
  }, [store, store.featureDetails, selectFeature]);
  return (
    <div>
      <globalCotext.Provider value={values}>{children}</globalCotext.Provider>
    </div>
  );
};
export const useGlobal = () => {
  return useContext(globalCotext);
};
