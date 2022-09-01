import React, { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import UseLocalStorage from "../hooks/local-storage";
import { useGlobal } from "./global-states.provider";
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
  const { replaceChar } = useGlobal();
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
    Safety_And_Security: "/safetysecurity",
    Luxury_And_Convenience: "/luxuryconvenience",
    Audio_And_Technology: "/audioandtechnology",
    authorized_retailer: "",
    maintenance: "/maintenance",
    warranty: "warranty",
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
  const getVechicleFeature = async (path) => {
    const responce = await getNew(
      `${paths[replaceChar(path, " ", "_")]}-view?carId=1`
    );
    const getKey = Object.keys(responce.data)[0];
    setStore({ ...store, feature: responce.data[getKey] });
  };
  const getALLMonroneyFeature = async (vin) => {
    try {
      const responce = await getNew(`/vinsearch?vin=${vin}`);
      responce.data.splice(1).map((val) => {
        const getKey = Object.keys(val)[0];
        if (
          val["Fuel Economy"] ||
          val["Gov Ratings"] ||
          val["Importation"] ||
          val["parts_content_information"] ||
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

    try {
      setLoading(true);
      const responce = await post("/userfunction", data);

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
  const reset = () => {
    setStore({ ...store, feature: {} });
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
    reset,
  };
  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
