import { Box, ListItem, ListItemButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import boardApi from "../../api/boardApi";
import { setFavouriteList } from "../../features/board/favouriteSlice";
import { toast } from "react-toastify";

const FavouriteList = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const list = useSelector((state) => state.favourites.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getFavouriteBoards();
        dispatch(setFavouriteList(res));
      } catch (err: any) {
        toast.error(err);
      }
    };
    getBoards();
  }, []);

  useEffect(() => {
    const index = list.findIndex((e: any) => e.id === boardId);
    setActiveIndex(index);
  }, [list, boardId]);

  //@ts-ignore
  const onDragEnd = async ({ source, destination }) => {
    const newList = [...list];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);

    dispatch(setFavouriteList(newList));

    try {
      await boardApi.updateFavouritePosition({ boards: newList });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <ListItem>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" fontWeight="700">
            Favourites
          </Typography>
        </Box>
      </ListItem>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"list-board-droppable-key"}
          droppableId={"list-board-droppable"}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item: any, index: any) => (
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
                        variant="body2"
                        fontWeight="700"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.icon} {item.title}
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
    </>
  );
};

export default FavouriteList;
