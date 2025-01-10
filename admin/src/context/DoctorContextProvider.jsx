import { createContext } from "react";

// Create the context
export const DoctorContext = createContext();

// DoctorContextProvider component
const DoctorContextProvider = (props) => {
  const value = {
    // Add your context values here
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
