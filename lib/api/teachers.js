import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = localStorage.getItem("token");

export const createTeacher = async (data) => {
  if (!token) throw new Error("No token found");

  const response = await axios.post(`${API_URL}/api/users`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchTeachers = async ({ queryKey }) => {
  if (!token) throw new Error("No token found");

  const [, search] = queryKey;

  const url = `${API_URL}/api/users?role=Teacher&q=${search || ""}`;
  console.log("Fetching from:", url); // ✅ Debugging log

  const response = await axios.get(`${API_URL}/api/users`, {
    params: {
      role: "Teacher",
      q: search || "", // Pass search query if available
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchTeacherById = async (teacherId) => {
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/api/users/${teacherId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTeacher = async ({ teacherId, data }) => {
  if (!token) throw new Error("No token found");

  const response = await axios.patch(
    `${API_URL}/api/users/${teacherId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteTeacher = async (teacherId) => {
  if (!token) throw new Error("No token found");

  await axios.delete(`${API_URL}/api/users/${teacherId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
