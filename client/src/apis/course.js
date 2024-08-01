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

export const addCourseApi = async (formData, token) => {
  try {
    const response = await axios.post(`${COURSE_URL}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
};

export const editCourseApi = async (formData, token) => {
  const response = await axios.put(`${COURSE_URL}/edit-course`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getCourseDetails = async (formData) => {
  try {
    const response = await axios.post(`${COURSE_URL}/get-course`, formData);

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
