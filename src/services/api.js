import axios from "axios";
import { executeLogout } from "./authUtils";

const api = axios.create({baseURL : "http://localhost:8080"});

let isrefresh = false;
const failedQueue = [];
api.interceptors.request.use(
    (config)=>{
        const publicEndPoints = ["/user/login" , "/user/register" , "/user/refresh" , "/user/logout"];
        if(publicEndPoints.includes(config.url) == false){
            const token = localStorage.getItem("accessToken");
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error)=>{
        const originalRequest = error.config;
        const status = error.response.status;
        const message = error.response.data.message;

        if(status === 401 && message === "JWT Token Expired" && originalRequest.url.includes("/login") === false && originalRequest.url.includes("/register") == false && originalRequest.url.includes("/refresh") == false){
            if(isrefresh){
                return new Promise((resolve,reject)=>{
                    failedQueue.push({resolve,reject});
                }).then((token)=>{
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
            }
            else{
                isrefresh = true;
                try{
                    const response = await api.post("/user/refresh" , {} , {withCredentials : true});
                    const token = response.data.data.accesstoken;
                    localStorage.setItem("accessToken" , token);
                    failedQueue.forEach((item)=>item.resolve(token));
                    failedQueue.length = 0;

                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }
                catch(error){
                    failedQueue.forEach((item)=> item.reject(error));
                    failedQueue.length = 0;
                    console.log(error.message);
                    executeLogout();
                    return Promise.reject(error);
                }
                finally{
                    isrefresh = false;
                }
            }
        }
        else if(status === 401){
            executeLogout();
            return Promise.reject(error);
        }
        else{
            return Promise.reject(error);
        }
    }
)

export default api;