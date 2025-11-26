import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext=createContext();
export const AppContextProvider=(props)=>{
    const [userDetails, setuserDetails] = useState([]);
    
        (async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/userdata`,{withCredentials:true});
                if (data.success) {
                     setuserDetails(data.user);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.log(err);
            }
        })();
   return (
    <AppContext.Provider value={userDetails}>
        {props.children}
    </AppContext.Provider>
   )
}