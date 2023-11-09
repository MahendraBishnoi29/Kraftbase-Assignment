import axiosClient from "./axiosClient";

export interface AuthParams {
  username: string;
  password: string;
  confirmPassword?: string;
}

const authApi = {
  signup: (params: AuthParams) => axiosClient.post("auth/signup", params),
  login: (params: AuthParams) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token"),
};

export default authApi;
