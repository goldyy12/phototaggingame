import axios from "axios";
const BASE_URL = "http://localhost:4000/api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api" || BASE_URL,
});

export default api;
