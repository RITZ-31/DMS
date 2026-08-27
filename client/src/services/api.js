import axios from "axios";

const api = axios.create({
  baseURL: "https://dms-o3lk.vercel.app/api",
});

export default api;