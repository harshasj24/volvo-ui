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
  });

  const getAllVechicles = async () => {
    if (!store.isLoaded) {
      const responce = await get("/vehicles");
      setStore({ ...store, allVechicles: responce.data, isLoaded: true });
    }
  };

  const values = useMemo(() => {
    return {
      allVechicles: store.allVechicles,
      getAllVechicles,
    };
  }, [store.allVechicles]);

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
