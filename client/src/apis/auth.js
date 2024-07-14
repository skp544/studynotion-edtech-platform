import axios from "axios";
import { catchError } from "../helper";
import { BASE_URL } from "./client";

const AUTH_URL = `${BASE_URL}/auth`;

export const sendOtpApi = async (formData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/send-otp`, formData);

    return response.data;
  } catch (e) {
    return catchError(e);
  }
};

export const registerApi = async (formData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const loginApi = async (formData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const resetPasswordTokenApi = async (formData) => {
  try {
    const response = await axios.post(
      `${AUTH_URL}/reset-password-token`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const resetPasswordApi = async (formData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/reset-password`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
