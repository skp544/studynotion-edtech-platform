import axios from "axios";
import { BASE_URL } from "./client";
import { catchError } from "../helper";

const COURSE_URL = `${BASE_URL}/course`;

export const getInstructorCourseApi = async (token) => {
  try {
    const response = await axios.get(`${COURSE_URL}/get-instructor-course`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
