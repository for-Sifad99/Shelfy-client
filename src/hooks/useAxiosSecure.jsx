import React from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});
const useAxiosSecure = () => {
    const { user } = useAuth();
    axiosInstance.interceptors.request.use(config => {
        if (user?.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        };
        return config;
    });

    return axiosInstance;
};

export default useAxiosSecure;