import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = localStorage.getItem("token");

export const updateProfilePicture = async ({ userId, file }) => {
  if (!token) throw new Error("No token found");

  const formData = new FormData();
  formData.append("profile", file); // Field name should match API

  const response = await axios.patch(
    `${API_URL}/api/users/${userId}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateUser = async ({ userId, data }) => {
  if (!token) throw new Error("No token found");

  const response = await axios.patch(`${API_URL}/api/users/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchUserById = async (userId) => {
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
