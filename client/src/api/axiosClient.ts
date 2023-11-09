import axios from "axios";
import queryString from "query-string";

const baseUrl = "https://kanban-klek.onrender.com/api/v1/";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params),
  },
});

//TODO: use axios TS types : AxiosRequestConfig and AxiosHeader for header
axiosClient.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
