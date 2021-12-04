import axios from "axios";

// global instance ex:1
//axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


//custome instance ex:2
const typeCodeInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});


// Add a request interceptor
typeCodeInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
typeCodeInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});



// const jarvisInstance = axios.create({
//     baseURL: 'https://jsonplaceholder.typicode.com'
// });

let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJzaGFoY2hhIiwicm9sZXMiOlsiU2VjdG9yIGFuYWx5c3QiXSwiY3VyIjoiMjAyMC0wOC0xOCAxNzoyMDoxMS41NzMwNTQiLCJleHAiOjI5MzQ3NDg4MDB9.bSSfNY23C0gHb36WswzKo3-HoSMuoaLHNQzRNOLTn1c';

const errorInterceptor = (error) => {    
    if (error.response && (error.response.data === "Your session has expired. Kindly login again" || error.response.data === "Invalid session" || error.response.data === "Authorization token is missing" || error.response.data === "Authorization session information is missing") && error.response.status === 401) {
        //notifyUser("error", {message: error.response?.data || "Some error occurred, please login again"});
        AudioListener(error.response?.data || "Some error occurred, please login again")
    }
    return Promise.reject(error);
}

const jarvisFastApiEnd = axios.create({
    baseURL: process.env.REACT_APP_JARVIS_FASTAPI_URL
});

jarvisFastApiEnd.interceptors.request.use(function (config) {
    config.headers.Authorization = token ? 'Bearer ' + token : '';
    return config;
});

jarvisFastApiEnd.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return errorInterceptor(error)
});


export const typeCodeAxios = typeCodeInstance;
export const jarvisFastApiAxios = jarvisFastApiEnd;