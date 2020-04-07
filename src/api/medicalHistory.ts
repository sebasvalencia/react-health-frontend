import axios from "axios";
import { IMedicalHistory } from "../models/types";
const urlEndpoints = "https://localhost:5001/api";


export const getAllMedicalsHistories = async () => {
    return await axios.get<{ value: IMedicalHistory }>(`${urlEndpoints}/sickness`);
  };