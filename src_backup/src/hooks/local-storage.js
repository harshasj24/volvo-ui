import React, { useState } from "react";

const UseLocalStorage = (key, defaultValue) => {
  const [role, setRole] = useState(() => {
    try {
      const role = localStorage.getItem(key);
      if (role) {
        return JSON.parse(role);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
    setRole(newValue);
  };
  return [role, setValue];
};

export default UseLocalStorage;
