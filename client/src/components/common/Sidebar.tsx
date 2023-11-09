//@ts-nocheck
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import boardApi from "../../api/boardApi";
import assests from "../../assets/index";
import { setBoards } from "../../features/board/boardSlice";
import FavouriteBoardsList from "./FavouriteBoardsList";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.board.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarWidth = 250;
  const { boardId } = useParams();

  const getAllBoards = async () => {
    try {
      const res = await boardApi.getAllBoards();
      dispatch(setBoards(res));
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getAllBoards();
  }, [dispatch]);

  useEffect(() => {
    const activeItem = boards.findIndex((e) => e.id === boardId);
    if (boards.length > 0 && boardId === null) {
      navigate(`/boards/${boards[0].id}`);
    }
    setActiveIndex(activeItem);
  }, [boards, boardId, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged Out 👍🏻");
  };

  const onDragEnd = async ({ source, destination }) => {
    const newList = [...boards];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);
    dispatch(setBoards(newList));

    try {
      await boardApi.updateBoardPosition({ boards: newList });
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  const createNewBoard = async () => {
    try {
      const res = await boardApi.createBoard();
      const newList = [res, ...boards];
      dispatch(setBoards(newList));
      navigate(`/boards/${res?.id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100%",
        "& > div": { borderRight: "none" },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: assests.colors.secondary,
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body" fontWeight="700">
              {user?.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: "10px" }} />
        <FavouriteBoardsList />

        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body" fontWeight="700">
              Private
            </Typography>
            <IconButton onClick={createNewBoard}>
              <AddBoxOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key={"list-board-droppable"}
            droppableId={"list-board-droppable"}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${item.id}`}
                        sx={{
                          pl: "20px",
                          cursor: snapshot.isDragging
                            ? "grab"
                            : "pointer!important",
                        }}
                      >
                        <Typography
                          fontWeight="700"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          variant="body2"
                        >
                          {item?.icon} {item?.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
};

export default Sidebar;
