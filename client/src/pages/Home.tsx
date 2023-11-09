import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import boardApi from "../api/boardApi";
import { setBoards } from "../features/board/boardSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const createBoard = async () => {
    setLoading(true);
    try {
      const res: any = await boardApi.createBoard();
      dispatch(setBoards([res]));
      navigate(`/boards/${res.id}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        color="success"
        onClick={createBoard}
        loading={loading}
      >
        Click here to create your first Board
      </LoadingButton>
    </Box>
  );
};

export default Home;
