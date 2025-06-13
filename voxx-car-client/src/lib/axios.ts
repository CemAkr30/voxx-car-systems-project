import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

export default axiosClient;
