import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
      },
    });

    return response.data.filter((user) => user.role === "Student");
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const updateProfilePicture = async ({ userId, file }) => {
  const token = localStorage.getItem("token");

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
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  const response = await axios.patch(`${API_URL}/api/users/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchUserById = async (userId) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
