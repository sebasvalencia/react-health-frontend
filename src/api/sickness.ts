import axios from "axios";
import { ISickness } from "../models/types";
const urlEndpoints = "https://localhost:5001/api";

export const getAllSickness = async () => {
  return await axios.get<{ value: ISickness }>(`${urlEndpoints}/sickness`);
};

export const deleteSickness = async (idSickness: number) => {
  return await axios(`${urlEndpoints}/sickness/${idSickness}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
};

export const postSickness = (sickness: ISickness) =>
  axios.post<{ value: ISickness }>(`${urlEndpoints}/sickness`, {
    ...sickness,
  });

export const putSickness = (sickness: ISickness) =>
  axios.put<{ value: ISickness }>(`${urlEndpoints}/sickness`, {
    ...sickness,
  });
