import { Patient, Credentials } from "./../models/types";
import axios from "axios";
import { PatientToSave } from "../models/types";
const urlEndpoints = "https://localhost:5001/api";

export const login = (credentials: Credentials) =>
  axios.post<{ value: string }>(`${urlEndpoints}/user/login`, {
    ...credentials,
  });

export const postPatient = async (patient: PatientToSave) => {
  return await axios(`${urlEndpoints}/user`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: patient,
  });
};

export const getAllPatients = async () => {
  return await axios.get(`${urlEndpoints}/user/patients`);
};

export const getPatientsWithSickness = async () => {
  return await axios.get(`${urlEndpoints}/user`);
};

export const updatePatient = async (patient: PatientToSave) => {
  return await axios(`${urlEndpoints}/user`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    data: patient,
  });
};

export const deletePatient = async (patient: PatientToSave) => {
  return await axios(`${urlEndpoints}/user`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    data: patient,
  });
};
