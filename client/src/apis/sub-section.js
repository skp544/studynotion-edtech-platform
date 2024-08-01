import { catchError } from "../helper";
import { BASE_URL } from "./client";
import axios from "axios";

const SUBSECTION_URL = `${BASE_URL}/sub-section`;

export const createSubSectionApi = async (formData, token) => {
  try {
    const response = await axios.post(`${SUBSECTION_URL}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
