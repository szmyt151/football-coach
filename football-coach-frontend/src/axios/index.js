import axios from 'axios'

const axiosInstance = axios.create({});

  axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization =  `Bearer ${localStorage.getItem('access_token')}`;

    return config;
})

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.log({error, code: error.statusCode})
        if (error.response.status === 401) {
            // localStorage.removeItem('access_token');
            // window.location.href = '/';
            return Promise.reject(error);
        }
      return Promise.reject(error);
  }
);

export default axiosInstance