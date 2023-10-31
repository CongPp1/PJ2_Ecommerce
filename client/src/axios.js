import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI
  });


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const localStorageData = JSON.parse(window.localStorage.getItem('persist:shop/user'));
    // console.log('localStorageData', localStorageData)
    if (localStorageData) {
      const accessToken = JSON.parse(localStorageData?.token)
      config.headers = {authorization: `Bearer ${accessToken}`}
      return config;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.data;
  });

  export default instance;