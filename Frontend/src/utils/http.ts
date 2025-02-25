import axios from "axios";//npm install axios
//this file to handle http requests

//an Axios instance configured with a base url(/api)
export const http = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  }
});
//Interceptor for responses will extracts the data from the response object
http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
//Interceptor for requests can be used to modify or log requests before they are sent.
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;