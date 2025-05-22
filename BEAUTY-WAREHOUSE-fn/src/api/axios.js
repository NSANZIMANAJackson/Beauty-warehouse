import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
const publicRoutes = ["/auth/login", "/auth/signup"];

axiosInstance.interceptors.request.use(
  (config) => {
    const isPublic = publicRoutes.includes(config.url);
    if (!isPublic) {
      const token = localStorage.getItem("authorization");
      if (token) {
        config.headers.authorization = token;
      }
    }
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default axiosInstance;
