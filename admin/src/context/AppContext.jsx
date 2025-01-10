import { createContext } from "react";

// Create the context
export const AppContext = createContext();

// AppContextProvider component
const AppContextProvider = (props) => {
  const value = {
  
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
