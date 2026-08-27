import axios from "axios";

const api = axios.create({
  baseURL: "https://dms-zeta-virid.vercel.app/api",
});

export default api;