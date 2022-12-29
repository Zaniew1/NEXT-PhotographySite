import { useState, useEffect } from "react";

export const useWidthSize = () => {
  const [firstDimensionCall, setFirstDimensionCall] = useState(false);
  const [widthSize, getDimension] = useState(0);

  useEffect(() => {
    if (!firstDimensionCall) {
      setFirstDimensionCall(true);
      getDimension(window.innerWidth);
    }
    window.addEventListener("resize", () => getDimension(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () =>
        getDimension(window.innerWidth)
      );
    };
  }, [firstDimensionCall, widthSize]);
  return widthSize;
};
