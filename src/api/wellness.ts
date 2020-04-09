import axios from "axios";
const urlEndpoints = "https://localhost:5001/api";

export const getAllWellness = async (patientSelect: number) => {
  return await axios.get<{ value: [] }>(
    `${urlEndpoints}/Wellness/${patientSelect}`
  );
};

export const postWellness = (wellness: any) =>
  axios.post<{ value: [] }>(`${urlEndpoints}/Wellness`, {
    ...wellness,
  });
