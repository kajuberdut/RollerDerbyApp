import React from "react";
import  { Navigate} from 'react-router-dom'

 /**  
  * Display protected route ensure user is logged in before allowing access to page 
  */

const ProtectedRoute = ({ children }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

export default ProtectedRoute;