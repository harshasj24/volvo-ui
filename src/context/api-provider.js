import React, { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseLocalStorage from "../hooks/local-storage";
const ApiContext = createContext();
const baseUrlAzure = "https://mroney-app1-function.azurewebsites.net/api/";
const baseUrl = "http://localhost:3100";
const get = (path) => {
  return axios.get(`${baseUrl}${path}`);
};

const post = (path, data) => {
  return axios.post(`${baseUrlAzure}${path}`, data);
};

export const ApiProvider = ({ children }) => {
  const navigate = useNavigate();
  const [store, setStore] = useState({
    isLoaded: false,
    allVechicles: [],
    feature: {},
    monronyLabel: {},
    pricing: {},
  });
  const [role, setRole] = UseLocalStorage("role", null);
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
  const login = async (data) => {
    try {
      const responce = await post("/userfunction", data);
      console.log(responce);
      if (responce.data === "USER" || responce.data === "ADMIN") {
        setRole(responce.data);
        navigate("/search");
      } else {
        alert(responce.data);
      }
    } catch (error) {
      navigate("/error");
    }
  };
  const values = {
    allVechicles: store.allVechicles,
    getAllVechicles,
    feature: store.feature,
    getVechicleFeature,
    demoResponce,
    monronyLabel: store.monronyLabel,
    getMonroneyFeature,
    pricing: store.pricing,
    login,
    role,
  };
  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
