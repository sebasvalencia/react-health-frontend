import axios from "axios";
import { IUSickness } from "../models/types";
const urlEndpoints = "https://localhost:5001/api";

export const deleteUserSickness = (idPatient: number, idUserSickness: number) =>
  axios.delete(`${urlEndpoints}/UserSickness/${idPatient}/${idUserSickness}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

export const postUserSickness = (userSickness: IUSickness) =>
  axios.post<{ value: unknown }>(`${urlEndpoints}/UserSickness`, {
    ...userSickness,
  });
