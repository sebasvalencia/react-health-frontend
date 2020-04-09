import axios from "axios";
import { IMedicalHistory, IMedicalHistoryApp } from "../models/types";
const urlEndpoints = "https://localhost:5001/api";

export const getAllMedicalsHistories = async (patientSelect: number) => {
  return await axios.get<{ value: IMedicalHistory[] }>(
    `${urlEndpoints}/MedicalHistory/${patientSelect}`
  );
};

export const postMedicalHistory = (medicalHistory: IMedicalHistory) =>
  axios.post<{ value: IMedicalHistoryApp }>(`${urlEndpoints}/MedicalHistory`, {
    ...medicalHistory,
  });

export const putMedicalHistory = (medicalHistory: IMedicalHistory) =>
  axios.put<{ value: IMedicalHistoryApp }>(`${urlEndpoints}/MedicalHistory`, {
    ...medicalHistory,
  });

export const deleteMedicalHistory = (idMedicalHistory: number) => {
  return axios(`${urlEndpoints}/MedicalHistory/${idMedicalHistory}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
};
