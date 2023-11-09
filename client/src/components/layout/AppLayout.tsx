import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser } from "../../features/user/userSlice";
import authUtils from "../../utils/authUtils";
import Loader from "../common/Loader";
import Sidebar from "../common/Sidebar";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        dispatch(setUser(user));
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loader fullHeight />
  ) : (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
