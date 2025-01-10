import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create the context
export const AdminContext = createContext();

// AdminContextProvider component
const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") || ""
  );

   const [doctors,setDoctors] =useState([])


  const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

      const   getallDoctors = async ()=>{

         try{

          const {data} = await axios.post(backendurl+'/api/admin/all-doctors',{},{headers:{aToken}})

          if (data.success){
            setDoctors(data.doctors)
            console.log(data.doctors)
          }else{
            toast.error(error.message)
          }

         } catch(error){
         
            toast.error(error.message)
         }
      } 


      const changeAvailablity = async (docId) =>{

        try{
          const {data} = await axios.post(backendurl+'/api/admin/change-availablity',{docId},{headers:{aToken}})

          if(data.success){
            toast.success(data.message)
            getallDoctors()
          }else{
            toast.error(error.message)
          }
        } catch(error){
           toast.error(error.message)

        }
      }
  // Sync aToken with localStorage whenever it changes
  useEffect(() => {
    if (aToken) {
        console.log(aToken)
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

  const value = {
    aToken,
    setAToken,
    backendurl,
    doctors,
    getallDoctors
    ,changeAvailablity
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
