import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log('error: ', error.response);

    const {config, status, data} = error.response;
    if (config.url === '/auth/local/register' && status === 400) {
      const message = data['data'][0]['messages'][0].message || ' ';
      throw new Error(message);
    }

    if (config.url === '/auth/local' && status === 400) {
      const message = data['data'][0]['messages'][0].message || ' ';
      throw new Error(message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
