import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = localStorage.getItem("token");

export const createStudent = async (studentData) => {
  if (!token) throw new Error("No token found");

  const response = await axios.post(`${API_URL}/api/users`, studentData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchStudents = async ({ queryKey }) => {
  const [, search] = queryKey;

  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/api/users`, {
    params: {
      role: "Student",
      q: search || "",
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchStudentById = async (studentId) => {
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/api/users/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateStudent = async ({ studentId, data }) => {
  if (!token) throw new Error("No token found");

  const response = await axios.patch(
    `${API_URL}/api/users/${studentId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const deleteStudent = async (id) => {
  if (!token) throw new Error("No token found");

  await axios.delete(`${API_URL}/api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return id;
};
