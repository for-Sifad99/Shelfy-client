import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/UseAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { getUserByEmail } from '../api/userApis';
import Loader from '../pages/Shared/Loader';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [isAdminLoading, setIsAdminLoading] = React.useState(true);
    const location = useLocation();

    React.useEffect(() => {
        const checkAdminStatus = async () => {
            if (user?.email) {
                try {
                    const userData = await getUserByEmail(axiosSecure, user.email);
                    setIsAdmin(userData.role === 'admin');
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setIsAdmin(false);
                } finally {
                    setIsAdminLoading(false);
                }
            } else {
                setIsAdminLoading(false);
            }
        };

        checkAdminStatus();
    }, [user, axiosSecure]);

    // Show loader while checking auth status
    if (loading || isAdminLoading) {
        return <Loader />;
    }

    // If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If user is not admin, redirect to home
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    // If user is admin, render the children
    return children;
};

export default AdminRoute;