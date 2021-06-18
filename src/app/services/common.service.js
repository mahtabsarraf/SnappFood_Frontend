import http from "./http.service";
import urlGenerator from "../utils/urlGenerator";

export const deleteRequest = async url => {
   try {
      const response = await http.delete(url);
      return response.data;
   } catch (e) {
      return false;
   }
};

export const deleteManyRequest = async (url, targetProp, data) => {
   const query = `?query={"${targetProp}":{"$in":[${data.map(d =>
      JSON.stringify(d)
   )}]}}`;
   try {
      const response = await http.delete(url + query);
      return response.data;
   } catch (error) {
      return false;
   }
};

export const getData = async url => {
   try {
      const response = await http.get(url);
      return response.data;
   } catch (e) {
      return false;
   }
};

export const sendData = async (url, data) => {
   try {
      const response = await http.put(url, data);
      return response.data;
   } catch (e) {
      return false;
   }
};

export const postData = async (url, data) => {
   try {
      const response = await http.post(url, data);
      return response.data;
   } catch (error) {
      return false;
   }
};

export const getFPSData = async config => {
   try {
      const response = await http.get(urlGenerator(config));
      return response.data;
   } catch (e) {
      return false;
   }
};

export default {
   deleteRequest,
   deleteManyRequest,
   getData,
   postData,
   getFPSData,
   sendData,
};
