import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import assets from "../../assets";
import authUtils from "../../utils/authUtils";
import Loader from "../common/Loader";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        setLoading(false);
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loader fullHeight />
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={assets.images.logoDark}
          style={{ width: "100px" }}
          alt="logo"
        />
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
