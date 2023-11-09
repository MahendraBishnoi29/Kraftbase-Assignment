import axiosClient from "./axiosClient";

const boardApi = {
  createBoard: () => axiosClient.post("boards"),
  getAllBoards: () => axiosClient.get("boards"),
  updateBoardPosition: (params: any) => axiosClient.put("boards", params),
  getSingleBoard: (id: string) => axiosClient.get(`boards/${id}`),
  updateBoard: (id: any, params: any) =>
    axiosClient.put(`boards/${id}`, params),
  getFavouriteBoards: () => axiosClient.get("boards/favouriteBoards"),
  updateFavouritePosition: (params: any) =>
    axiosClient.put("boards/favourites", params),
};

export default boardApi;
