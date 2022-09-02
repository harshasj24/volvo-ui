import React, { createContext, useContext, useMemo, useState } from "react";
import { useApi } from "./api-provider";
const globalCotext = createContext();
export const GlobalStaesProvider = ({ children }) => {
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
    console.log(selected);
  };

  const setSelect = () => {};

  const resetSelcted = () => {
    // setStore({ ...store, featureDetails: "", selectedFeature: "" });
  };

  const refresh = () => {
    console.log(store);
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
    try {
      if (feature.title === "Authorized Retailer") {
        console.log(feature);
        setDetails(feature?.address);
      } else {
        console.log(feature.features);
        Object.keys(feature?.features).map((key) => {
          setDetails((prev) => {
            return prev + feature?.features[key] + "\n";
          });
        });
      }
    } catch (error) {}
  };
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
