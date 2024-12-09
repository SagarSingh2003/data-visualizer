import axios from 'axios';

const interceptor_api = axios.create({
    baseURL: 'https://data-visualizer-zeta.vercel.app',
    withCredentials: true,
});


interceptor_api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {


            window.location.href = ('/signup');

            return Promise.reject('Unauthorized');
        }
        return Promise.reject(error);
    }
);

export default interceptor_api;