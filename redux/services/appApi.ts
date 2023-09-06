import axios from "axios";
const API = axios.create({
  baseURL: "http://3wdz.c.time4vps.cloud:3000",
});
const API_URL = "/";
export const getDataApi = async () => {
  const {data} = await API.get(API_URL);

  return data;
};
export const getFolderDataApi = async (id: string) => {
  const res = await API.get(`http://3wdz.c.time4vps.cloud:3000/file/${id}`);
  return res.data;
};
