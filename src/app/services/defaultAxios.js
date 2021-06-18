import axios from "axios";
import errorHandler from "../utils/errorHandler";
import storageHelper from "../utils/storageHelper";

const instance = axios.create();
const instanceWithAuthorization = axios.create();

export const setConfig = () => {
   instance.defaults.baseURL = process.env.REACT_APP_BASE_URL;
   instanceWithAuthorization.defaults.baseURL = process.env.REACT_APP_BASE_URL;
};

//sets initial authorization header, this function doesn't have any effect if user is not logged in
export const addAuthorization = () => {
   let token = storageHelper({ key: "accessToken", type: "get" });
   if (token)
      instanceWithAuthorization.defaults.headers.common["Authorization"] =
         "Bearer " + token;
};

export const axiosSetup = (axiosInstance) => {
   axiosInstance.interceptors.request.use(
      (req) => {
         return req;
      },
      (err) => {
         return err;
      }
   );

   axiosInstance.interceptors.response.use(
      (res) => {
         return res;
      },
      (error) => errorHandler(error)
   );
};

setConfig();
addAuthorization();
axiosSetup(instance);
axiosSetup(instanceWithAuthorization);

const defaultAxios = {
   addAuthorization,
   axiosSetup,
   instance,
   instanceWithAuthorization,
   setConfig,
};
export default defaultAxios;
