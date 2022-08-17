import React, { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";
const ApiContext = createContext();

const baseUrl = "http://localhost:3100";

const get = (path) => {
  return axios.get(`${baseUrl}${path}`);
};

export const ApiProvider = ({ children }) => {
  const [store, setStore] = useState({
    isLoaded: false,
    allVechicles: [],
    feature: {},
  });

  const getAllVechicles = async () => {
    if (!store.isLoaded) {
      const responce = await get("/vehicles");
      setStore({ ...store, allVechicles: responce.data, isLoaded: true });
    }
  };
  const getVechicleFeature = async () => {
    const reaponce = await get("/features");
    setStore({ ...store, feature: reaponce.data[0] });
  };
  const values = useMemo(() => {
    return {
      allVechicles: store.allVechicles,
      getAllVechicles,
      feature: store.feature,
      getVechicleFeature,
    };
  }, [store.allVechicles, store.feature]);

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
