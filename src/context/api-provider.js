import React, { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import UseLocalStorage from "../hooks/local-storage";
const ApiContext = createContext();
const baseUrlAzure = "https://mroney-app1-function.azurewebsites.net/api/";
const baseUrl = "http://localhost:3100";
const get = (path) => {
  return axios.get(`${baseUrl}${path}`);
};
const getNew = (path) => {
  return axios.get(`${baseUrlAzure}${path}`);
};

const post = (path, data) => {
  return axios.post(`${baseUrlAzure}${path}`, data);
};

export const ApiProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [store, setStore] = useState({
    isLoaded: false,
    allVechicles: [],
    feature: {},
    monronyFeatures: {},
    monronyGovtMandet: {},
    monronyLabel: {},
    pricing: {},
    newAll: [],
  });
  const [role, setRole] = UseLocalStorage("user", null);
  const paths = {
    pricing: "/getPricing",
    performance: "/performance",
    safety_and_security: "/safetysecurity",
  };

  const getAllVechicles = async () => {
    if (!store.isLoaded) {
      // const responce = await get("/vehicles");

      const responce = await getNew("/vehicle-view");
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
  const getALLMonroneyFeature = async (vin) => {
    console.log(vin);
    try {
      const responce = await getNew(`/vinsearch?vin=${vin}`);
      responce.data.splice(1).map((val) => {
        const getKey = Object.keys(val)[0];
        if (
          val?.fuel_economy ||
          val?.gov_ratings ||
          val?.importation ||
          val?.parts_content_information ||
          val?.vehicle_identification
        ) {
          setStore((pre) => {
            return {
              ...pre,
              monronyGovtMandet: {
                ...pre?.monronyGovtMandet,
                [getKey]: val[getKey],
              },
            };
          });
        } else {
          setStore((prev) => {
            return {
              ...prev,
              monronyFeatures: {
                ...prev?.monronyFeatures,
                [getKey]: val[getKey],
              },
            };
          });
        }
      });
    } catch (error) {}
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
  const login = async (data, openSnackbar, setLoading) => {
    const from = location.state?.from?.pathname || "/search";
    console.log(from);
    try {
      setLoading(true);
      const responce = await post("/userfunction", data);
      console.log(responce);
      if (
        responce.data === "Name: Thomas Smith Role: USER" ||
        responce.data === "Name: Michael Monroney Role: ADMIN"
      ) {
        const resArr = responce.data.split(" ");
        const userDetails = {
          name: `${resArr[1]} ${resArr[2]}`,
          role: `${resArr[resArr.length - 1]}`,
        };
        setRole(userDetails);
        navigate(from, { replace: true });
      } else {
        // alert(responce.data);
        openSnackbar(responce.data);
      }
      setLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };
  const logout = () => {
    setRole(null);
    navigate("/login", { state: null });
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
    logout,
    getALLMonroneyFeature,
    isLoaded: store.isLoaded,
    monronyFeatures: store.monronyFeatures,
    monronyGovtMandet: store.monronyGovtMandet,
  };
  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
