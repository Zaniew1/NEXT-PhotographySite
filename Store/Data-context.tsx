import { useWidthSize } from "../hooks/useWidthSize";
import React, { useState, useEffect } from "react";
import { UiContextType,ContextPropsType, DataContextType } from "../Types/types";

export const DataContext = React.createContext<DataContextType>({
    dataSlider: {},
    dataOffer: {},
    dataOpinion: {},
    dataGallery: {},
    setDataSlider: (data: string) => {},
    setDataOffer: (data: string) => {},
    setDataOpinion: (data: string) => {},
    setDataGallery: (data: string) => {},
    setDataPortfolio: (data: string) => {},

});

export const DataContextProvider = (props: any) => {
  const [dataSlider, setDataSlider] = useState<{}>({});
  const [dataOffer, setDataOffer] =  useState<{}>({});
  const [dataOpinion, setDataOpinion] =  useState<{}>({});
  const [dataGallery, setDataGallery] =  useState<{}>({});
  const [dataPortfolio, setDataPortfolio] =  useState<{}>({});

  return (
    <DataContext.Provider
      value={{
        dataSlider: dataSlider,
        dataOffer: dataOffer,
        dataOpinion: dataOpinion,
        dataGallery: dataGallery,
        setDataSlider: setDataSlider,
        setDataOffer: setDataOffer,
        setDataOpinion: setDataOpinion,
        setDataGallery: setDataGallery,
        setDataPortfolio:setDataPortfolio,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
