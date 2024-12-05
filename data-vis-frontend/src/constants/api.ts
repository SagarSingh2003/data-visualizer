import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const interceptor_api = axios.create({
    baseURL: 'http://your-api-url.com',
    withCredentials: true,
});

// Add a response interceptor
interceptor_api.interceptors.response.use(
    response => response, // Simply return the response if it's okay
    error => {
        // Check if the error is due to unauthorized access
        if (error.response && error.response.status === 401) {
            // Navigate to signup or login page
            const navigate = useNavigate();
            navigate('/signup');
            // Return a rejected promise to stop further execution
            return Promise.reject('Unauthorized');
        }
        return Promise.reject(error); // Handle other errors
    }
);

export default interceptor_api;