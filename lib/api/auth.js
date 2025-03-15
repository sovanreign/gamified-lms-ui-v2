import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, data);
  return response.data;
};
