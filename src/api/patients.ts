import axios from "axios";
const urlEndpoints = "https://localhost:5001/api";

export const getPatients = async () => {
  return await axios.get(`${urlEndpoints}/user`);
};

export const postPatient = async () => {
  return await axios.post(`${urlEndpoints}/user`);
}
