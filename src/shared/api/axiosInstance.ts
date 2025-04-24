import axios from "axios";

export const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://35.224.163.23" ,
});
