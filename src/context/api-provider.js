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
    monronyLabel: {},
    pricing: {},
  });

  const paths = {
    pricing: "/getPricing",
    performance: "/performance",
    safety_and_security: "/safetysecurity",
  };

  const getAllVechicles = async () => {
    if (!store.isLoaded) {
      const responce = await get("/vehicles");
      setStore({ ...store, allVechicles: responce.data, isLoaded: true });
    }
  };
  const demoResponce = async () => {
    const { data } = await get("/demoResponce");
    // console.log(data);
    const filt = data.filter((v) => {
      return v.type === "feature";
    });
    return filt;
  };
  const getVechicleFeature = async () => {
    const reaponce = await get("/features");
    setStore({ ...store, feature: reaponce.data[0] });
  };
  const getMonroneyFeature = async (path) => {
    const responce = await get(paths[path]);
    console.log(responce);
    setStore({ ...store, pricing: responce["data"] });
  };
  // const values = useMemo(() => {
  //   return {
  //     allVechicles: store.allVechicles,
  //     getAllVechicles,
  //     feature: store.feature,
  //     getVechicleFeature,
  //     demoResponce,
  //     monronyLabel: store.monronyLabel,
  //   };
  // }, [store.allVechicles, store.feature, store.monronyLabel]);
  const values = {
    allVechicles: store.allVechicles,
    getAllVechicles,
    feature: store.feature,
    getVechicleFeature,
    demoResponce,
    monronyLabel: store.monronyLabel,
    getMonroneyFeature,
    pricing: store.pricing,
  };
  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
