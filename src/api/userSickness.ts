import axios from "axios";
import { IUSickness } from "../models/types";
const urlEndpoints = "https://localhost:5001/api";

export const getAllPatientSicknees = async (patientSelect: number) => {
  return await axios.get<{ value: [] }>(
    `${urlEndpoints}/UserSickness/${patientSelect}`
  );
};

export const postUserSickness = (userSickness: IUSickness) =>
  axios.post<{ value: unknown }>(`${urlEndpoints}/UserSickness`, {
    ...userSickness,
  });

export const putUserSickness = (userSickness: IUSickness) =>
  axios.put<{ value: unknown }>(`${urlEndpoints}/UserSickness`, {
    ...userSickness,
  });

export const deleteUserSickness = (userSickness: IUSickness) =>
  axios.delete(`${urlEndpoints}/UserSickness`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    data: userSickness,
  });
