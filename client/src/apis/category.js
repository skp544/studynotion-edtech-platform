import axios from "axios";
import { catchError } from "../helper";
import { BASE_URL } from "./client";

const CATEGORY_URL = `${BASE_URL}/category`;

export const getAllCategoriesApi = async () => {
  try {
    const response = await axios.get(`${CATEGORY_URL}/all-categories`);

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
