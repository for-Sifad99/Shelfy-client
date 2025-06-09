import React from 'react';
import useAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRouter = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // set loading when user Null
    if (loading) {
        return <span> Loading... </span>
    };

    // navigate user where he/she want to go After login
    if (!user && !user?.email) {
        return <Navigate to='/login' state={location?.pathname} />;
    };

    // return children 
    return children;
};

export default PrivetRouter;


