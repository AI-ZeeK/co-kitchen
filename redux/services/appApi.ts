import axios from "axios";

export const getDataApi = async () => {
  const {data} = await axios.get("http://3wdz.c.time4vps.cloud:3000/");

  return data;
};
export const getFolderDataApi = async (id: string) => {
  const res = await axios.get(`http://3wdz.c.time4vps.cloud:3000/file/${id}`);
  return res.data;
};
