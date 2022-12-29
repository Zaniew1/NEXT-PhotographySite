import { useWidthSize } from "../hooks/useWidthSize";
import React, { useState, useEffect } from "react";
import { UiContextType,UIContextPropsType } from "../Types/types";
export const UIContext = React.createContext<UiContextType>({
  drop: true,
  desktopResolution: true,
  dropDownNav: (dropNav: boolean) => {},
});

export const UiContextProvider = (props: UIContextPropsType) => {
  const [dropDownNav, setDropDownNav] = useState<boolean>(true);
  const [desktopResolution, setDesktopResolution] = useState(false);
  const widthSize = useWidthSize();

  useEffect(() => {
    if (widthSize >= 768) {
      setDesktopResolution(true);
    } else {
      setDesktopResolution(false);
    }
  }, [widthSize]);

  return (
    <UIContext.Provider
      value={{
        drop: dropDownNav,
        desktopResolution: desktopResolution,
        dropDownNav: setDropDownNav,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};
