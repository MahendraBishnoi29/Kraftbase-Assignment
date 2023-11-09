import authApi from "../api/authApi";

const authUtils = {
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      //TODO: fix TS RES type
      const res: any = await authApi.verifyToken();
      return res.user;
    } catch (err: any) {
      console.log(err.message);
      return false;
    }
  },
};

export default authUtils;
