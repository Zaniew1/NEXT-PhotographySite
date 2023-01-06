import React, { useState } from "react";
import {AuthContextType, ContextPropsType} from '../Types/types'
export const AuthContext = React.createContext<AuthContextType>({
  loggedIn: false,
  loggedInFunction: (loggedIn: boolean) => {},
});

export const AuthContextProvider = (props: ContextPropsType) => {
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
        loggedInFunction: setloggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
