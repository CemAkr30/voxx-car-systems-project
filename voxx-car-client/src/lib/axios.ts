import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:9090",
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("accessToken");
      // throw redirect({
      //   to: "/login",
      // });
    }
    return Promise.reject(error);
  }
);
