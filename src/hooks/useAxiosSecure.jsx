import axios from 'axios';
import useAuth from './UseAuth';

const useAxiosSecure = () => {
    const { user } = useAuth();

    const axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_server_url}/api/`
    });

    // request interceptor
    axiosInstance.interceptors.request.use(async (config) => {
        if (user) {
            try {
                // Get ID token without force refresh to avoid quota issues
                const token = await user.getIdToken(false);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error getting Firebase ID token:', error);
                // If we get a quota error, try again with force refresh
                if (error.code === 'auth/quota-exceeded') {
                    try {
                        const token = await user.getIdToken(true);
                        if (token) {
                            config.headers.Authorization = `Bearer ${token}`;
                        }
                    } catch (refreshError) {
                        console.error('Error force refreshing Firebase ID token:', refreshError);
                    }
                }
            }
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // response interceptor
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                // Handle 401 errors if needed
                console.error('Unauthorized access - token may be expired');
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxiosSecure;