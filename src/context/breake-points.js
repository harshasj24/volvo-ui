import React, { createContext, useContext, useMemo, useState } from "react";
const breakPointContext = createContext();
const breakPoints = {
  mobile: "(max-width:600px)",
  tablet: "(min-width:600px) and (max-width:960px)",
  laptop: "(min-width:960px) and (max-width:1023px)",
  desktop: "(min-width:1024px)",
};
export const BreakePoints = ({ children }) => {
  const [breakPoint, setBreakPoint] = useState();
  const matchMediaQuerry = (breakpoints, setBreakPoint) => {
    Object.keys(breakpoints).map((key) => {
      if (window.matchMedia(breakPoints[key]).matches) {
        setBreakPoint(key);
      }
    });
  };
  const breakepointObserver = () => {
    window.addEventListener("resize", () => {
      matchMediaQuerry(breakPoints, setBreakPoint);
    });
  };

  const checkBreakPoint = (...viewPort) => {
    const [mobile, tablet, laptop, desktop] = viewPort;
    if (
      breakPoint === mobile ||
      breakPoint === tablet ||
      breakPoint === laptop ||
      breakPoint === desktop
    ) {
      return true;
    }
  };
  const value = useMemo(() => {
    return {
      breakPoint,
      breakepointObserver,
      checkBreakPoint,
    };
  }, [breakPoint]);
  return (
    <div>
      {
        <breakPointContext.Provider value={value}>
          {children}
        </breakPointContext.Provider>
      }
    </div>
  );
};

export const useBreakePoint = () => {
  return useContext(breakPointContext);
};
