import React, { useEffect } from "react"
import { Route, useNavigate } from "react-router-dom"
const PrivateRoute=({element:element,isAuthenticated,...rest})=>{
    const navigate=useNavigate();
    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login');
        }
    },[])
   return element;
}
export default PrivateRoute;
