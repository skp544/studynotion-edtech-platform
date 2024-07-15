import axios from "axios";
import { BASE_URL } from "./client";
import { catchError } from "../helper";

const PROFILE_URL = `${BASE_URL}/profile`;

export const changeDisplayPictureApi = async (formData, token) => {
  try {
    const response = await axios.post(
      `${PROFILE_URL}/update-display-picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateUserApi = async (formData, token) => {
  try {
    const response = await axios.put(
      `${PROFILE_URL}/update-profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteUserApi = async (token) => {
  try {
    const response = await axios.delete(`${PROFILE_URL}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getUserDetailsApi = async (token) => {
  try {
    const response = await axios.get(`${PROFILE_URL}/get-user-details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getEnrolledCoursesApi = async (token) => {
  try {
    const response = await axios.get(`${PROFILE_URL}/get-enrolled-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const getInstructorDashboardApi = async (token) => {
  try {
    const response = await axios.get(`${PROFILE_URL}/instructor-dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
