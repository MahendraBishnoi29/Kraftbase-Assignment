import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import boardReducer from "./board/boardSlice";
import favouriteReducer from "./board/favouriteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    favourites: favouriteReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
