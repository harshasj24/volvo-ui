import React, { createContext, useContext, useMemo, useState } from "react";
import { useApi } from "./api-provider";
const globalCotext = createContext();
export const GlobalStaesProvider = ({ children }) => {
  const [store, setStore] = useState({
    selectedFeature: "",
    featureDetails: "",
  });
  const { feature } = useApi();
  const selectFeature = (selected) => {
    setStore({
      ...store,
      selectedFeature: selected,
      featureDetails: feature[selected.toLowerCase()],
    });
  };

  const resetSelcted = () => {
    setStore({ ...store, featureDetails: "", selectedFeature: "" });
  };

  const values = useMemo(() => {
    return {
      selectedFeature: store.selectedFeature,
      selectFeature,
      featureDetails: store.featureDetails,
      resetSelcted,
    };
  }, [store, selectFeature]);
  return (
    <div>
      <globalCotext.Provider value={values}>{children}</globalCotext.Provider>
    </div>
  );
};
export const useGlobal = () => {
  return useContext(globalCotext);
};
