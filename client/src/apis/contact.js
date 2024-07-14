import axios from "axios";
import { catchError } from "../helper";
import { BASE_URL } from "./client";

const CONTACT_URL = `${BASE_URL}/contact`;

export const contactUsApi = async (formData) => {
  try {
    const response = await axios.post(`${CONTACT_URL}/contact-us`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
