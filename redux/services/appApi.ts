import axios from "axios";

export const getDataApi = async () => {
  const {data} = await axios.get("/api");

  return data;
};
export const getFolderDataApi = async (id: string) => {
  const {data} = await axios.get(`/api/file/${id}`);
  return data;
};
