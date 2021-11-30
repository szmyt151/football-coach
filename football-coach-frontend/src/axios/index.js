import axios from 'axios'

const instance = axios.create({
    timeout: 1000,
    headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
  });

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("INTER:", error.toJSON())

    if(error.toJSON().status === 401){
        console.log("true")
        localStorage.removeItem('access_token')
    }

    return Promise.reject(error);
});

export default instance