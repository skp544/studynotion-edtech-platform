import axios from "axios";
import { BASE_URL } from "./client";
import { catchError } from "../helper";

const SECTION_URL = `${BASE_URL}/section`;

export const createSectionApi = async (formData, token) => {
  try {
    const response = await axios.post(`${SECTION_URL}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateSectionApi = async (formData, token) => {
  try {
    const response = await axios.put(`${SECTION_URL}/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    response.data;
  } catch (error) {
    return catchError(error);
  }
};
