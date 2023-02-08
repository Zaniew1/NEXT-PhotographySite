import React, { useState } from "react";
import {AuthContextType, ContextPropsType} from '../Types/types';
import { useFetchFirebaseDatabase } from "../hooks/useFetchFirebaseDatabase";
export const GalleryContext = React.createContext<{allPictures: {}, deletePicture: (url:string)=> void}>({
  allPictures: {},
  deletePicture: (url:string) => {}
});

export const GalleryContextProvider = (props: ContextPropsType) => {
  const [allPictures, setAllPictures] = useState<any>();
  const fetchedProperties = useFetchFirebaseDatabase("Gallery");
//   setAllPictures(fetchedProperties);
  
  return (
    <GalleryContext.Provider
      value={{
        allPictures: allPictures,
        deletePicture: (url:string) => {}
      }}
    >
      {props.children}
    </GalleryContext.Provider>
  );
};
